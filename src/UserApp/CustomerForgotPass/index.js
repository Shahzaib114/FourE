import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import styles from './style';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { PostingCustomerForgotPassword } from '../../../store/Actions/CustomerForgotPass/ForgotPasswordMail';
import NetInfo from "@react-native-community/netinfo";
const CustomerForgotPass = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errormsgMail, setErrorMsgMail] = useState('');
    const [userMail, setUserMail] = useState('');
    const [forgotPass, setForgotPass] = useState(false);


    const authLoading = useSelector((state) => state.customerForgotPass.runLoader)
    const data = useSelector((state) => state.customerForgotPass.data)
    const error = useSelector((state) => state.customerForgotPass.error)
    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(authLoading)
        if (!authLoading && data != null) {
            if(forgotPass){
                navigation.replace('CustomerVerifyForgotOTP', { paramDriverMail: userMail })
                alert(data)    
            }
        }
        else if (!authLoading && error != null) {
            alert('Credentials are Wrong')
        }
    }, [authLoading])

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setForgotPass(false)
            // Do something when the screen blurs
        });
        return unsubscribe;
    }, [navigation]);

    const postEmail = () => {
        setForgotPass(true)
        let reg = /^\S*$/;
        if ((errormsgMail.length != 0) || (errormsgMail != '') || (userMail == '')) {
            setErrorMsgMail('Enter Correct Credentials')
        }
        else if (reg.test(userMail) === false) {
            setErrorMsgMail('White Spaces Not Allowed!!')
        }
        else {
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
                    dispatch(PostingCustomerForgotPassword({ email: userMail }))
                }
            })

        }
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.contentContainer}>
                <View style={styles.HeaderViewStyle}>
                    <View style={styles.carImageView}>
                        <Text style={styles.notificationsText}>
                            Forgot Password
                        </Text>
                        <Text style={styles.notificationIcon}>
                            ?
                        </Text>
                    </View>
                </View>
                <View>
                    <View style={styles.TextInputField}>
                        <Image source={require('../../../assets/Images/forgetImage.png')}
                            style={{ alignSelf: 'center', marginVertical: '20%' }}
                        />
                        <View style={styles.iconsandInputView}>
                            <Feather name='at-sign' size={20} color='#AAB9C7' style={styles.inputIconStyle}>
                            </Feather>
                            <TextInput
                                placeholder="Email Your Mail"
                                placeholderTextColor='#AAB9C7'
                                underlineColorAndroid={"#E4EDF5"}
                                style={styles.PlaceholderStyling}
                                onChangeText={text => {
                                    let reg = /^\S*$/;
                                    if (text.length == 0) {
                                        setErrorMsgMail('Kindly Enter User Email');
                                    }
                                    else if (reg.test(text) === false) {
                                        setErrorMsgMail('White Spaces Not Allowed!!')
                                        setUserMail('')
                                    }
                                    else {
                                        setErrorMsgMail('')
                                        setUserMail(text);
                                    }
                                }}
                            />
                        </View>
                        <Text style={styles.errorText}>
                            {errormsgMail}
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
                                        postEmail()
                                    }
                                    style={styles.touchableView}>
                                    <Text style={styles.emailtext}>
                                        Submit
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
export default CustomerForgotPass;