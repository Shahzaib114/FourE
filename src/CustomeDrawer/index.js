import React, { useState, } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, PermissionsAndroid, } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from "./style";
import Entypo from "react-native-vector-icons/Entypo"
import { useNavigation } from "@react-navigation/native";
import Colors from '../../utility/colors/Colors';
import StarRating from 'react-native-star-rating-widget';
import ClientLayer from '../../components/Layers/ClientLayer';
import RNPusherPushNotifications from "react-native-pusher-push-notifications";
import { Switch } from 'react-native-gesture-handler';
const CustomDrawer = (props) => {
    const navigation = useNavigation()
    const [userName, setUserName] = useState('Shahzaib Younus');
    const [customStarRating, setCustomStarRating] = useState(4);
    const onStarRatingPress = (rating) => {
        setCustomStarRating(rating)
    }
    const sessionHandle = () => {
        ClientLayer.getInstance().getDataManager().GetValueForKey('locationAllowed', isActive => {
            let is_active = JSON.parse(isActive)
            console.log(is_active)
            if (is_active === false || is_active === undefined) {
                alert('Kindly Turn off your Get Rides Activity, so you can not recieve rides anymore!')
            } else {
                ClientLayer.getInstance().getDataManager().SaveValueForKey('started', JSON.stringify(null))
                ClientLayer.getInstance().getDataManager().SaveValueForKey('type', JSON.stringify(null))
                ClientLayer.getInstance().getDataManager().SaveValueForKey('notificationJobId', JSON.stringify(null))
                ClientLayer.getInstance().getDataManager().SaveValueForKey('alreadyStarted', JSON.stringify(null))
                ClientLayer.getInstance().getDataManager().SaveValueForKey('driver_id', JSON.stringify(null));
                ClientLayer.getInstance().getDataManager().GetValueForKey('driverInstanceId', instanceId => {
                    let id = JSON.parse(instanceId)
                    unsubscribe(id)
                })
                navigationhandle()
            }
        })

    }
    const unsubscribe = interest => {
        console.log('unSubscribe', interest)
        RNPusherPushNotifications.unsubscribe(
            interest,
            (statusCode, response) => {
                console.log(statusCode, response);
            },
            () => {
                console.log('unsubscibed', interest);
            }
        );
    };
    const navigationhandle = () => {
        navigation.replace('LogIn')
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={styles.secondaryView}>

                <View style={styles.imageView}>
                    <ImageBackground source={require('../../assets/Images/user.png')}
                        style={styles.ImageStyling}
                        imageStyle={{ borderRadius: 32 }}
                    >
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
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
                    style={styles.contactUsOpacity}>
                    <Text style={styles.contactUsText}>
                        Contact Us
                    </Text>
                    <Entypo name='help-with-circle' size={18} color={Colors.getLightColor('primaryColor')} />
                </TouchableOpacity>
                <ImageBackground style={styles.bottomImage}
                    source={require('../../assets/Images/logoutBottomCornerButton.png')}>
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

export default CustomDrawer;