import React, { useEffect, useState } from 'react';
import {
    Text,
    Image,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ActivityIndicator,
    PermissionsAndroid,
    Alert,
} from 'react-native';
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPusherPushNotifications from "react-native-pusher-push-notifications";
import styles from './style';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../store/Actions/Login/logIn';
import ClientLayer from '../../components/Layers/ClientLayer';
import Colors from '../../utility/colors/Colors';
import { useNavigation } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";

const LogIn = ({ navigation, route }) => {

    const [userMail, setUserMail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [errormsgMail, setErrorMsgMail] = useState('');
    const [errormsgPass, setErrorMsgPass] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const authLoading = useSelector((state) => state.login.runLoader)
    const data = useSelector((state) => state.login.data)
    const error = useSelector((state) => state.login.error)
    const dispatch = useDispatch();

    function handleBackButtonClick() {
        navigation.exitApp();
        return true;
    }

    useEffect(() => {
        getPermissions()
        ClientLayer.getInstance().getDataManager().GetValueForKey('driver_mail', result => {
            if (result == null) {
                null
            }
            else {
                setUserMail(JSON.parse(result))
                setCheckBoxIcon('check-box')
            }
        });
        ClientLayer.getInstance().getDataManager().GetValueForKey('driver_pass', result => {
            if (result == null) {
                null
            }
            else {
                setUserPass(JSON.parse(result))
            }
        });
    }, []);
    const getPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location");
                // getBackgroundDone()
            } else {
                console.log("location permission denied");
            }
        } catch (err) {
            console.warn(err);
        }

    };
    // const getBackgroundDone = async () => {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
    //             {
    //                 title: "FourE App wants to Access Your Location",
    //                 message:
    //                     "Please enable location to ALLOW ALL THE TIME " +
    //                     "so you can take awesome pictures.",
    //                 // buttonNeutral: "Ask Me Later",
    //                 // buttonNegative: "Cancel",
    //                 buttonPositive: "Allow all the time"
    //             }
    //         );
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             console.log("You can use the Backgroundlocation");
    //         } else {
    //             console.log("location permission denied");
    //         }
    //     } catch (err) {
    //         console.warn(err);
    //     }
    // }
    const subscribe = (interest) => {
        console.log('subscribe', interest)
        // Note that only Android devices will respond to success/error callbacks
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
    useEffect(() => {
        setIsLoading(authLoading)
        if (!authLoading && data != null) {
            ClientLayer.getInstance().getDataManager().GetValueForKey('driver_id', result => {
                if ((result != 'null') && (result != null)) {
                    //setting up Push Notification Instance(Driver_Id)
                    let Driver_Id = JSON.parse(result)
                    RNPusherPushNotifications.setInstanceId('4b6a75e4-b377-4556-8635-9b856cb9cd99')
                    RNPusherPushNotifications.on('registered', () => {
                        // subscribe('driver_' + Driver_Id)
                        ClientLayer.getInstance().getDataManager().SaveValueForKey('driverInstanceId', JSON.stringify('driver_' + Driver_Id))

                    })
                    if (data.data.is_active == true) {
                        navigation.replace('TravelHistory', {
                            paramDriverId: result,
                        })
                    }
                    else {
                        setModalVisible(true)
                        ClientLayer.getInstance().getDataManager().RemoveKey('driver_id')
                    }
                }
                else {
                    null
                    // console.log('id is ', result)
                }
            })
        }
        else if (!authLoading && error != null) {
            //code for error message display 
            // console.log('error is', error)
            alert('Credentials are Wrong', error)
        }
    }, [authLoading]);

    const postLoginData = async () => {
        ClientLayer.getInstance().getDataManager().GetValueForKey(userMail, result => {
            // dispatch(authenticate({ email: userMail, password: JSON.parse(userPass), status: result }))
            dispatch(authenticate({ email: userMail, password: userPass, status: result }))
        })
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
    };
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
            ClientLayer.getInstance().getDataManager().SaveValueForKey('driver_mail', JSON.stringify(userMail));
            ClientLayer.getInstance().getDataManager().SaveValueForKey('driver_pass', JSON.stringify(userPass));
            setCheckBoxIcon('check-box');
        } else if (checkBoxIcon === 'check-box') {
            setCheckBoxIcon('check-box-outline-blank');
            ClientLayer.getInstance().getDataManager().RemoveKey('driver_mail');
            ClientLayer.getInstance().getDataManager().RemoveKey('driver_pass');

        }
    };
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>
            <Modal
                animationIn={'fadeIn'}
                animationInTiming={800}
                visible={modalVisible}
                style={{ margin: 0 }}
            >
                <View style={styles.modalHeaderView}>
                    <AntDesign name='warning' color={Colors.getLightColor('primayColor')} size={60}
                        style={styles.warningIcon}>
                    </AntDesign>
                    <Text style={styles.warningText}>
                        Your Profile is under Approval Process !{'\n'} Do You want to Update Details ?
                    </Text>
                    <View style={styles.touchableOptionView}>
                        <TouchableOpacity onPress={() => {
                            // navigation.navigate('EmailSignupFirstPart')
                            alert('feature under maintenance')
                            setModalVisible(false)
                        }}
                            style={styles.changeProfileDetails}>
                            <Feather name='user' size={25} color={Colors.getLightColor('primaryColor')} style={{ marginLeft: '3%', alignSelf: 'center' }} />
                            <Text style={styles.changeProfileDetailsText}>
                                Change Profile Details
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            alert('feature under maintenance')
                            // navigation.navigate('VehicleInfo')
                            setModalVisible(false)
                        }}
                            style={styles.changeVehicleDetails}>
                            <Ionicons name='car-sport' size={25} color={Colors.getLightColor('primaryColor')} style={{ marginLeft: '3%', marginVertical: '4%', alignSelf: 'center' }} />
                            <Text style={styles.changeVehicleDetailsText}>
                                Change Vehicle Details
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.skipTextOpacity}>
                        <Text style={styles.skipText}>
                            Skip
                        </Text>
                    </TouchableOpacity>
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
                        <Image source={require('../../assets/Images/FourELogo.png')}>
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
                    <Image style={{ alignSelf: 'center' }}
                        source={require('../../assets/Images/FourELogo.png')}>
                    </Image>

                    <View style={styles.welcomeLogin}>
                        <Text style={styles.welcomeText}>
                            Welcome!
                        </Text>
                        <Text style={styles.loginText}>
                            Driver Login
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
                        <TouchableOpacity onPress={() => navigation.navigate('ForgetPass')}
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
                        <TouchableOpacity onPress={() => navigation.navigate('EmailSignupFirstPart')}>
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
                    <Image source={require('../../assets/Images/carImage.png')}
                        style={styles.bottomImageStyle}>
                    </Image>
                </View>
            </ScrollView>
        </View>
    )
};
export default LogIn;

