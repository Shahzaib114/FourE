import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import styles from './style';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { PostingForgotPasswordOTP } from '../../store/Actions/ForgotOtp/PostForgotOtp';
import Colors from '../../utility/colors/Colors';
import { useRef } from 'react';
import CountDownTimer from 'react-native-countdown-timer-hooks';
import { ResendOTPRequest } from '../../store/Actions/ResendOtp/ResendOTP';
import NetInfo from "@react-native-community/netinfo";
const VerifyForgotOtp = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errormsgOtp, setErrorMsgOtp] = useState('');
    const [driverOtp, setDriverOtp] = useState('');
    const [resendIsLoading, setresendIsLoading] = useState(false);
    const [verfiyingOtp, setVerfiyingOtp] = useState(false);

    const authLoading = useSelector((state) => state.ForgotPassOTP.runLoader)
    const data = useSelector((state) => state.ForgotPassOTP.data)
    const error = useSelector((state) => state.ForgotPassOTP.error)
    const dispatch = useDispatch()
    useEffect(() => {
        setIsLoading(authLoading)
        if (!authLoading && data != null) {
            if(data.data === 'error'){
                alert('wrong credentials')
            }else{
                if(verfiyingOtp){
                    navigation.replace('ResetPass', { paramDriverMail: route.params.paramDriverMail })
                    console.log('All ok', data)    
                }    
            }
        }
        else if (!authLoading && error != null) {
            alert('Credentials are Wrong')
        }
    }, [authLoading])

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setVerfiyingOtp(false)
            // Do something when the screen blurs
        });
        return unsubscribe;
    }, [navigation]);

    const postOtp = () => {
        setVerfiyingOtp(true)
        if (driverOtp.length == 0) {
            alert('Please Input Number')
        }
        else {
             // import NetInfo from "@react-native-community/netinfo";
             NetInfo.fetch().then(state => {
                if (state.isInternetReachable === false) {
                    console.log('network not available!')
                    navigation.navigate('NetworkCheck')
                } else {
                    dispatch(PostingForgotPasswordOTP({ opt: driverOtp }))
                }
            })
        }
    }

    const resendLoading = useSelector((state) => state.ResendOTPRequest.runLoader)
    const resendData = useSelector((state) => state.ResendOTPRequest.data)
    const resendError = useSelector((state) => state.ResendOTPRequest.error)

    useEffect(() => {
        setresendIsLoading(resendLoading)
        if (!resendLoading && resendData != null) {
        }
        else if (!resendLoading && resendError != null) {
            alert('Credentials are Wrong')
        }
    }, [resendLoading]);

    const postResendRequest = () => {
        NetInfo.fetch().then(state => {
            if (state.isInternetReachable === false) {
                console.log('network not available!')
                navigation.navigate('NetworkCheck')
            } else {
                dispatch(ResendOTPRequest({ email: route.params.paramDriverMail }))
            }
        })
    }

    const refTimer = useRef();
    const [timerEnd, setTimerEnd] = useState(false);
    const timerCallbackFunc = (timerFlag) => {
        setTimerEnd(timerFlag)
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.contentContainer}>
                <View style={styles.HeaderViewStyle}>
                    <View style={styles.carImageView}>
                        <Text style={styles.notificationsText}>
                            Verify OTP
                        </Text>
                        <MaterialCommunityIcons name='dots-horizontal' size={40}
                            style={styles.notificationIcon}
                        />
                    </View>
                </View>
                <View style={styles.ImageView}>
                    <Image source={require('../../assets/Images/forgotOtp.png')}
                        style={styles.imageStyle}
                    />
                    <View style={styles.TextInputField}>
                        <View style={styles.iconsandInputView}>
                            <Feather name='at-sign' size={20} color='#AAB9C7' style={styles.inputIconStyle}>
                            </Feather>
                            <TextInput
                                placeholder="OTP"
                                placeholderTextColor='#AAB9C7'
                                underlineColorAndroid={"#E4EDF5"}
                                style={styles.PlaceholderStyling}
                                keyboardAppearance='default'
                                keyboardType='decimal-pad'
                                onChangeText={text => {
                                    let reg = /^\S*$/;
                                    if (text.length == 0) {
                                        setErrorMsgOtp('Kindly Enter Verification OTP');
                                    }
                                    else if (reg.test(text) === false) {
                                        setErrorMsgOtp('White Spaces Not Allowed!!')
                                    }
                                    else {
                                        setErrorMsgOtp('')
                                        setDriverOtp(text);
                                    }
                                }}
                            />
                        </View>
                        <Text style={styles.errorText}>
                            {errormsgOtp}
                        </Text>
                        <Text style={styles.FourDigitTetx}>
                            An OTP code has been sent to your given Mail {'\n'}
                            <Text style={{ color: 'grey' }}>
                                {route.params.paramDriverMail}
                            </Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.resendMainCOntainer}>
                    <View style={styles.didntrecieveOTPscndView}>
                        <View>
                            <Text style={styles.RetryText}>
                                Didn't received OTP ? {' '}
                            </Text>
                        </View>
                        <View style={{ display: timerEnd ? 'none' : 'flex', flexDirection: 'row' }}>
                            <CountDownTimer
                                ref={refTimer}
                                timestamp={120}
                                timerCallback={timerCallbackFunc}
                                containerStyle={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                textStyle={{
                                    fontSize: 18,
                                    color: Colors.getLightColor('secondaryColor'),
                                    fontWeight: '500',
                                }}
                            />
                        </View>
                        <TouchableOpacity
                            style={{
                                display: timerEnd ? 'flex' : 'none',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                postResendRequest()
                                setTimerEnd(false);
                                refTimer.current.resetTimer();
                            }}>
                            <Text style={{ fontSize: 18, color: Colors.getLightColor('secondaryColor'), fontWeight: 'bold' }}>
                                Resend
                            </Text>
                        </TouchableOpacity>
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
                                        postOtp()
                                    }
                                    style={styles.touchableView}>
                                    <Text style={styles.emailtext}>
                                        Contninue
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </View>
            </ScrollView>
        </View>
    )
};
export default VerifyForgotOtp;