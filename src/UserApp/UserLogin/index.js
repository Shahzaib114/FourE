import React, { useEffect, useState } from 'react';
import {
    Text,
    Image,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ActivityIndicator,
    Alert,
    Modal,
    PermissionsAndroid,
    Linking
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../../utility/colors/Colors';
import ClientLayer from '../../../components/Layers/ClientLayer';
import { CustomerValidation } from '../../../store/Actions/CustomerLogin/CustomerLogin';
import RNPusherPushNotifications from "react-native-pusher-push-notifications";
import NetInfo from "@react-native-community/netinfo";
import AntDesign from 'react-native-vector-icons/AntDesign';
// import { check, PERMISSIONS, request } from 'react-native-permissions';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
const CustomerLogin = ({ navigation, route, props }) => {
    const [userMail, setUserMail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [errormsgMail, setErrorMsgMail] = useState('');
    const [errormsgPass, setErrorMsgPass] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [driverStatus, setDriverStatus] = useState(false);

    const authLoading = useSelector((state) => state.customerLogin.runLoader)
    const data = useSelector((state) => state.customerLogin.data)
    const error = useSelector((state) => state.customerLogin.error)
    const dispatch = useDispatch();

    function handleBackButtonClick() {
        navigation.exitApp();
        return true;
    }

    const subscribe = (interest) => {
        console.log('subscribe', interest)
        RNPusherPushNotifications.subscribe(
            interest,
            (statusCode, response) => {
                console.error(statusCode, response);
            },
            () => {
                console.log('Success');
            }
        );
    }
    const getPermissionsnotification = async () => {
        check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
            .then(async(result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log('This feature is not available (on this device / in this context)');
                        break;
                    case RESULTS.DENIED:
                        try {
                            const granted = await PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION,
                            )
                            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                console.log("You can use the notifications");
                                // setNotificationPermission(false)
                            } else {
                                console.log("notifications permission denied")
                                // setNotificationPermission(true)
                            }
                        } catch (err) {
                            console.warn(err);
                        }
                        console.log('The permission has not been requested / is denied but requestable')
                        break;
                    case RESULTS.LIMITED:
                        console.log('The permission is limited: some actions are possible');
                        break;
                    case RESULTS.GRANTED:
                        console.log('The permission is granted');
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    };
   
    useEffect(() => {
        getPermissionsnotification()
    }, [])
    useEffect(() => {
        setIsLoading(authLoading)
        if (!authLoading && data != null) {
            ClientLayer.getInstance().getDataManager().GetValueForKey('customer_mail', result => {
                if (result == null) {
                    null
                }
                else {
                    setUserMail(JSON.parse(result))
                    setCheckBoxIcon('check-box')
                }
            });
            ClientLayer.getInstance().getDataManager().GetValueForKey('customer_pass', result => {
                if (result == null) {
                    null
                }
                else {
                    setUserPass(JSON.parse(result))
                }
            });
            if (data.data == 'error') {
                alert('Credentials are Wrong')
            } else {
                ClientLayer.getInstance().getDataManager().GetValueForKey('customer_id', result => {
                    if ((result != 'null') && (result != null)) {
                        let Customer_Id = JSON.parse(result)
                        RNPusherPushNotifications.setInstanceId('4b6a75e4-b377-4556-8635-9b856cb9cd99')
                        RNPusherPushNotifications.on('registered', () => {
                            subscribe('customer_' + Customer_Id)
                            ClientLayer.getInstance().getDataManager().SaveValueForKey('customerInstanceId', JSON.stringify('customer_' + Customer_Id))
                        })
                        navigation.navigate('CustomerHomePage', {
                            paramDriverId: result,
                        })
                    }
                    else {
                        console.log('id is ', result)
                    }
                })
            }
        }
        else if (!authLoading && error != null) {
            //code for error message display 
            alert('Credentials are Wrong')
        }
    }, [authLoading]);

    const postLoginData = async () => {
        dispatch(CustomerValidation({ email: userMail, password: userPass }))
    }

    const [netModalVisible, setNetModalVisible] = useState(false)

    const validate = () => {
        if ((userMail.length == '') || (errormsgMail.length != '')) {
            setErrorMsgMail('Please Enter Mail')
        }
        else if ((userPass.length == '') || (errormsgPass.length != '')) {
            setErrorMsgPass('Please Enter Your Password')
        }
        else {
            // import NetInfo from "@react-native-community/netinfo";
            NetInfo.fetch().then(state => {
                if (state.isInternetReachable === false) {
                    setNetModalVisible(true)
                } else {
                    postLoginData()
                }
            })
        }
    }

    const [rightIcon, setRightIcon] = useState('eye-off');
    const [checkBoxIcon, setCheckBoxIcon] = useState('check-box-outline-blank');

    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [checkVisibility, setCheckVisibility] = useState(true);

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        }
    }

    const ValidationForRememberMeCheck = () => {
        if ((userMail.length == '') || (errormsgMail.length != '')) {
            setErrorMsgMail('Please Enter Mail')
        }
        else if ((userPass.length == '') || (errormsgPass.length != '')) {
            setErrorMsgPass('Please Enter Your Password')
        }
        else {
            RememberMeCheck()
        }
    }

    const RememberMeCheck = () => {
        if (checkBoxIcon === 'check-box-outline-blank') {
            ClientLayer.getInstance().getDataManager().SaveValueForKey('customer_mail', JSON.stringify(userMail));
            ClientLayer.getInstance().getDataManager().SaveValueForKey('customer_pass', JSON.stringify(userPass));
            setCheckBoxIcon('check-box');
        } else if (checkBoxIcon === 'check-box') {
            setCheckBoxIcon('check-box-outline-blank');
            ClientLayer.getInstance().getDataManager().RemoveKey('customer_mail');
            ClientLayer.getInstance().getDataManager().RemoveKey('customer_pass');

        }
    }
    const [notificationPermission, setNotificationPermission] = useState(null)

    return (
        <View style={styles.container}>
            <Modal
                animationIn={'fadeIn'}
                animationInTiming={800}
                visible={notificationPermission}
                transparent={false}
                style={{ margin: 0 }}
            >
                <View style={styles.netContainer}>
                    <View>
                        <Image source={require('../../../assets/Images/FourELogo.png')}>
                        </Image>
                    </View>
                    <View style={{ width: '90%' }}>
                        <View style={styles.netSecondMainView}>
                            <Text style={styles.netTurnOnWifiText}>
                                Please Allow Notification Permissions from setting to get notified everytime !
                            </Text>
                            <TouchableOpacity style={styles.netOkOpacity}
                                onPress={() => {
                                    setNotificationPermission(false)
                                    Linking.openSettings()
                                }} >
                                <Text style={styles.netOkText}>
                                    Ok
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.scrollViewStyle}
                contentContainerStyle={styles.contentContainer}>
                <View style={styles.firstView}>
                    <Image style={{ alignSelf: 'center', }}
                        source={require('../../../assets/Images/FourELogo.png')}>
                    </Image>
                    <View style={styles.welcomeLogin}>
                        <Text style={styles.welcomeText}>
                            Welcome!
                        </Text>
                        <Text style={styles.loginText}>
                            User Login
                        </Text>
                    </View>
                </View>

                <View style={styles.TextInputSection}>
                    <View style={styles.TextInputField}>
                        <Text style={styles.TextInputHeaderText}>
                            Mail
                        </Text>
                        <View style={styles.iconsandInputView}>
                            <TextInput
                                placeholder={'Enter Your Mail'}
                                placeholderTextColor='#AAB9C7'
                                underlineColorAndroid={"#E4EDF5"}
                                value={userMail}
                                onChangeText={txt => {
                                    let reg = /^\S*$/;
                                    if (txt.length == 0) {
                                        setErrorMsgMail('Kindly Enter User Email');
                                        setUserMail(txt);
                                    }
                                    else if (reg.test(txt) === false) {
                                        setErrorMsgMail('White Spaces Not Allowed!!')
                                        setUserMail(txt);
                                    }
                                    else {
                                        setErrorMsgMail('');
                                        setUserMail(txt);
                                    }
                                }}
                                style={styles.PlaceholderStyling}
                            />
                            <Ionicons name='at-outline' size={25} color={Colors.getLightColor('whiteColor')} style={styles.inputIconStyle}
                            />
                        </View>
                        <Text style={styles.errorText}>
                            {errormsgMail}
                        </Text>
                    </View>

                    <View style={styles.TextInputField}>
                        <Text style={styles.TextInputHeaderText}>
                            Password
                        </Text>
                        <View style={styles.iconsandInputView}>
                            <TextInput
                                placeholder={'Enter Your Pass'}
                                placeholderTextColor='#AAB9C7'
                                underlineColorAndroid={"#E4EDF5"}
                                secureTextEntry={passwordVisibility}
                                value={userPass}
                                onChangeText={txt => {
                                    let reg = /^\S*$/;
                                    if (txt.length == 0) {
                                        setErrorMsgPass('Kindly Enter User Pass')
                                        setUserPass(txt);
                                    }
                                    else if (reg.test(txt) === false) {
                                        setErrorMsgPass('White Spaces Not Allowed!!')
                                        setUserPass(txt);
                                    }
                                    else {
                                        setErrorMsgPass('');
                                        setUserPass(txt);
                                    }
                                }}
                                style={styles.PlaceholderStyling}
                            />
                            <MaterialCommunityIcons
                                onPress={() => handlePasswordVisibility()} name={rightIcon} size={25} color={Colors.getLightColor('whiteColor')}
                                style={styles.inputIconStyle}
                            />
                        </View>
                        <Text style={styles.errorText}>
                            {errormsgPass}
                        </Text>
                    </View>

                    <View style={styles.forgotView}>
                        <TouchableOpacity onPress={() => ValidationForRememberMeCheck()}
                            style={styles.forgotPassOpacity}>
                            <MaterialIcons
                                name={checkBoxIcon} size={20} color={Colors.getLightColor('whiteColor')}
                                style={styles.inputIconStyle}
                            />
                            <Text style={{ color: Colors.getLightColor('whiteColor'), fontFamily: 'Montserrat-Medium', }}>
                                Remember me
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CustomerForgotPass')}
                            style={styles.forgotPassOpacity}>
                            <Text style={styles.forgottext}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.loginButtonView}>
                    <View style={styles.BottomLineView}>
                        <Text style={styles.creatAccount}>
                            Don't Have an account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('CustomerSignup')}>
                            <Text style={styles.LoginTouch}>
                                SIGN UP
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {isLoading ?
                        (
                            <View style={styles.indicatorView}>
                                <ActivityIndicator size={'large'} color={Colors.getLightColor('secondaryColor')} ></ActivityIndicator>
                            </View>
                        )
                        :
                        (
                            <TouchableOpacity
                                onPress={() =>
                                    validate()
                                }
                                style={styles.touchableView}>
                                <Text style={styles.emailtext}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                </View>

                <View style={styles.imageViewBottom}>
                    <Image source={require('../../../assets/Images/carImage.png')}
                        style={styles.bottomImageStyle}>
                    </Image>
                </View>
            </ScrollView>
        </View>
    )
};
export default CustomerLogin;

