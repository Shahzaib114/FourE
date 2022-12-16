import { View, Text, ScrollView, Image, SafeAreaView, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, Linking, KeyboardAvoidingView, Platform, Dimensions } from 'react-native'
import React, { Component, useState, useEffect, Alert } from 'react';
import styles from './style';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { onResetCustomerResetPassword, updatingCustomerResetPassword } from '../../../store/Actions/CustomerResetPass/postResetPassword';
import Colors from '../../../utility/colors/Colors';
import NetInfo from "@react-native-community/netinfo";
const CustomerResetPass = ({ navigation, route }) => {
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


    const authLoading = useSelector((state) => state.customerResetPass.runLoader);
    const data = useSelector((state) => state.customerResetPass.data);
    const error = useSelector((state) => state.customerResetPass.error);
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
        else{
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
                    dispatch(updatingCustomerResetPassword({ email: route.params.paramDriverMail, password: userPass, password_confirmation: userConfirmPass }))
                }
            })
        }
    }
    useEffect(() => {
        setIsLoading(authLoading)
        if (!authLoading && data != null) {
            if(resetPass){
                alert(data)
                onResetCustomerResetPassword()
                navigation.replace('CustomerLogin')    
            }
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

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.contentContainer}>
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
                        source={require('../../../assets/Images/resetpassImage.png')}>
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
                                let rjx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/
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
                        <View style={{ margin: '5%' }}>
                            <ActivityIndicator size={'large'} color={Colors.getLightColor('secondaryColor')}></ActivityIndicator>
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
                    )}
            </ScrollView>
        </View>
    )
};
export default CustomerResetPass;