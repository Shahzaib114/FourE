import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    Image,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ActivityIndicator,
    Dimensions,
    Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { LogBox } from 'react-native';
import CustomBackArrow from '../../CustomBackArrow';
import styles from './style';
import ClientLayer from '../../../components/Layers/ClientLayer';
import Colors from '../../../utility/colors/Colors';
import { ResendCustomerOTPRequest } from '../../../store/Actions/ResendCustomerSignupOTP/ResendCustomerSignupOTP';
import { postCustomerConfirmationCode } from '../../../store/Actions/ValidateCustomerSignupOTP/ValidateCustomerOTP';
import CountDownTimer from 'react-native-countdown-timer-hooks';
import NetInfo from "@react-native-community/netinfo";
const CustomerSignupOTP = ({ navigation }) => {
    const [inputText, setInputText] = useState('your Mail');
    const [checkSend, setCheckSend] = useState(false);
    const [confirmOTP, setConfirmOTP] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resendIsLoading, setresendIsLoading] = useState(false);
    const [usermail, setUserMail] = useState('');
    const [userId, setUserId] = useState()

    const loading = useSelector((state) => state.customerValidateOTP.runLoader)
    const data = useSelector((state) => state.customerValidateOTP.data)
    const error = useSelector((state) => state.customerValidateOTP.error)
    const dispatch = useDispatch();

    const resendLoading = useSelector((state) => state.customerResendSignupOTP.runLoader)
    const resendData = useSelector((state) => state.customerResendSignupOTP.data)
    const resendError = useSelector((state) => state.customerResendSignupOTP.error)


    useEffect(() => {
        setresendIsLoading(resendLoading)
        if (!resendLoading && resendData != null) {
            console.log('response', resendData)
        }
        else if (!resendLoading && resendError != null) {
            alert('Credentials are Wrong')
        }
    }, [resendLoading])


    useEffect(() => {
        ClientLayer.getInstance().getDataManager().GetValueForKey('email', result => {
            console.log('mail is', result)
            setUserMail(JSON.parse(result))
        })
        ClientLayer.getInstance().getDataManager().GetValueForKey('customer_id', result => {
            console.log('id is', result)
            setUserId(result)
        })
        setIsLoading(loading)
        if (!loading && data != null) {
            if (data.data != 'error') {
                alert('Account has been created successfully!')
                navigation.navigate('CustomerLogin')
            }
            else {
                alert('Credentials are Wrong')
            }
        }
        else if (!loading && error != null) {
            alert('Credentials are Wrong')
        }
    }, [loading])

    const postResendRequest = () => {
        // import NetInfo from "@react-native-community/netinfo";
        NetInfo.fetch().then(state => {
            if (state.isInternetReachable === false) {
                console.log('network not available!')
                Alert.alert(
                    "No Internet",
                    "Please Turn On Your Wifi or Recharge your Mobile Data",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                )
            } else {
                dispatch(ResendCustomerOTPRequest({
                    email: usermail
                }))
            }
        })
    }

    const postOtp = () => {
        if (confirmOTP.length == 0) {
            alert('Please Input Number')
        }
        else {
            NetInfo.fetch().then(state => {
                if (state.isInternetReachable === false) {
                    console.log('network not available!')
                    Alert.alert(
                        "No Internet",
                        "Please Turn On Your Wifi or Recharge your Mobile Data",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    )
                } else {
                    dispatch(postCustomerConfirmationCode({
                        opt: confirmOTP,
                    }))
                }
            })
        }
    }

    const refTimer = useRef();
    const [timerEnd, setTimerEnd] = useState(false);
    const timerCallbackFunc = (timerFlag) => {
        setTimerEnd(timerFlag)
    }

    return (
        <ScrollView style={styles.scrollViewStyle}
            contentContainerStyle={styles.contentContainer}>
            <View style={styles.logoImageView}>
                <Image
                    source={require('../../../assets/Images/FourELogo.png')}>
                </Image>
            </View>
            <View style={{ margin: '5%', }}>
                <TextInput
                    style={styles.codeInput}
                    onChangeText={(text) =>
                        setConfirmOTP(text)
                    }
                    keyboardType="numeric"
                />
                <Text style={styles.FourDigitTetx}>
                    An OTP code has been sent to your given Mail {'\n'}
                    <Text style={{ color: 'silver', lineHeight: 25 }}>
                        {usermail}
                    </Text>
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <Text style={styles.RetryText}>
                            Didn't received otp ? {' '}
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

            </View>
            {isLoading ?
                (
                    <View style={styles.indicatorView}>
                        <ActivityIndicator size={'large'} color={Colors.getLightColor('secondaryColor')}></ActivityIndicator>
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
        </ScrollView>
    )
}
export default CustomerSignupOTP;