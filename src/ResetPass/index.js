import { View, Text, ScrollView, Image, SafeAreaView, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal } from 'react-native'
import React, { Component, useState, useEffect, Alert } from 'react';
import styles from './style';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { updatingResetPassword } from '../../store/Actions/ResetPassword/postResetPassword';
import NetInfo from "@react-native-community/netinfo";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utility/colors/Colors';

const ResetPass = ({ navigation, route }) => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye-off');
    const [errorConfirmPass, setErrorConfirmPass] = useState('');
    const [errorPass, seterrorPass] = useState('');
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true);
    const [confirmRightIcon, setConfirmRightIcon] = useState('eye-off');
    const [userPass, setUserPass] = useState();
    const [userConfirmPass, setUserConfirmPass] = useState('');
    const [errormsgPass, setErrorMsgPass] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resetPass, setResetPass] = useState(false);

    const authLoading = useSelector((state) => state.ResetPass.runLoader);
    const data = useSelector((state) => state.ResetPass.data);
    const error = useSelector((state) => state.ResetPass.error);
    const dispatch = useDispatch();

    const ResetPassWordFunction = () => {
        setResetPass(true)
        let reg = /^\S*$/;
        if ((userPass != userConfirmPass)) {
            seterrorPass('Password did not Matched!')
        }
        else if ((reg.test(userPass) === false) || (reg.test(userConfirmPass) === false)) {
            setErrorMsgPass('White Spaces Not Allowed!!')
        }
        else if ((userPass.length == 0) || (userConfirmPass.length == 0)) {
            seterrorPass('Please Input Pass')
        }
        else {
            // import NetInfo from "@react-native-community/netinfo";
            NetInfo.fetch().then(state => {
                if (state.isInternetReachable === false) {
                    console.log('network not available!')
                    setNetModalVisible(true)
                } else {
                    dispatch(updatingResetPassword({ email: route.params.paramDriverMail, password: userPass, password_confirmation: userConfirmPass }))
                }
            })
        }
    }
    
    useEffect(() => {
        setIsLoading(authLoading)
        if (!authLoading && data != null) {
            if(resetPass){
                alert(data)
                navigation.replace('LogIn')    
            }
            // alert('Password has been changed!')
            // navigation.navigate('LogIn')
        }
        else if (!authLoading && error != null) {
            alert('Credentials are Wrong')
        }
    }, [authLoading])

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setResetPass(false)
            // Do something when the screen blurs
        });
        return unsubscribe;
    }, [navigation]);

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const handleConfirmPasswordVisibility = () => {
        if (confirmRightIcon === 'eye-off') {
            setConfirmRightIcon('eye');
            setConfirmPasswordVisibility(!confirmPasswordVisibility);
        } else if (confirmRightIcon === 'eye') {
            setConfirmRightIcon('eye-off');
            setConfirmPasswordVisibility(!confirmPasswordVisibility);
        }
    };

    const [netModalVisible, setNetModalVisible] = useState(false)

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
                style={styles.scrollViewStyle} contentContainerStyle={styles.contentContainer}>
                <View style={styles.HeaderViewStyle}>
                    <View style={styles.carImageView}>
                        <Text style={styles.notificationsText}>
                            Reset Password
                        </Text>
                        <MaterialCommunityIcons name='lock-reset' size={40}
                            style={styles.notificationIcon}
                        />
                    </View>
                </View>
                <View style={styles.resetPasswordContainer}>
                    <Text style={styles.loginText}>
                        Reset {'\n'}Password?
                    </Text>
                    <Image style={{ alignSelf: 'center' }}
                        source={require('../../assets/Images/resetpassImage.png')}>
                    </Image>
                </View>
                <View style={styles.TextInputField}>
                    <View style={styles.iconsandInputView}>
                        <SimpleLineIcons name='lock' size={20} color='#AAB9C7' style={styles.inputIconStyle}>
                        </SimpleLineIcons>
                        <TextInput
                            scrollEnabled={false}
                            placeholder="Password"
                            secureTextEntry={passwordVisibility}
                            placeholderTextColor='#AAB9C7'
                            underlineColorAndroid={"#E4EDF5"}
                            onChangeText={txt => {
                                let reg = /^\S*$/;
                                if (txt.length == 0) {
                                    setErrorMsgPass("Please enter valid PassWord")
                                    setUserPass(txt)
                                }
                                else if (reg.test(txt) === false) {
                                    setErrorMsgPass('White Spaces Not Allowed!!')
                                    setUserPass(txt)
                                }
                                else {
                                    setErrorMsgPass("");
                                    setUserPass(txt)
                                }
                            }}
                            style={styles.PlaceholderStyling}
                        />
                        <TouchableOpacity style={{ justifyContent: 'center' }}>
                            <MaterialCommunityIcons
                                onPress={() => handlePasswordVisibility()} name={rightIcon} size={30} color="#232323" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.errorText}>
                        {errormsgPass}
                    </Text>
                </View>
                <View style={styles.TextInputField}>
                    <View style={styles.iconsandInputView}>
                        <SimpleLineIcons name='lock' size={20} color='#AAB9C7' style={styles.inputIconStyle}>
                        </SimpleLineIcons>
                        <TextInput
                            placeholder="Confirm Password"
                            placeholderTextColor='#AAB9C7'
                            secureTextEntry={confirmPasswordVisibility}
                            underlineColorAndroid={"#E4EDF5"}
                            onChangeText={txt => {
                                if (txt != userPass) {
                                    setErrorConfirmPass("PassWord did not Matched!")
                                    setUserConfirmPass(txt)
                                }
                                else {
                                    setErrorConfirmPass("");
                                    setUserConfirmPass(txt)
                                }
                            }}
                            style={styles.PlaceholderStyling}
                        />
                        <TouchableOpacity style={{ justifyContent: 'center' }}>
                            <MaterialCommunityIcons
                                onPress={() => handleConfirmPasswordVisibility()} name={confirmRightIcon} size={30} color="#232323" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.errorText}>
                        {errorConfirmPass}
                    </Text>
                </View>
                {isLoading ?
                    (
                        <View style={styles.indicatorView}>
                            <ActivityIndicator size={'large'} color='black'></ActivityIndicator>
                        </View>
                    )
                    :
                    (
                        <View>
                            <TouchableOpacity
                                onPress={() =>
                                    ResetPassWordFunction()
                                }
                                style={styles.touchableView}>
                                <Text style={styles.emailtext}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </ScrollView>
        </View>
    )
};
export default ResetPass;