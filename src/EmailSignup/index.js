
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, Linking, KeyboardAvoidingView, Platform, Dimensions } from 'react-native'
import React, { Component, useState, useEffect, Alert } from 'react';
import styles from './style';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import CustomBackArrow from '../CustomBackArrow';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../../store/Actions/EmailSignup/signUp';
import ClientLayer from '../../components/Layers/ClientLayer';
import Colors from '../../utility/colors/Colors';
import NetInfo from "@react-native-community/netinfo";
const EmailSignup = ({ navigation, route }) => {
    const [licenseNumber, setLicenseNumber] = useState('');
    const [errorLicense, setErrorLicense] = useState('');

    const [selectedDate, setSelectedDate] = useState('');
    const [errorDate, setErrorDate] = useState('');

    const [userPass, setUserPass] = useState('');
    const [errorPass, seterrorPass] = useState('');

    const [userConfirmPass, setUserConfirmPass] = useState('');
    const [errorConfirmPass, setErrorConfirmPass] = useState('');

    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye-off');
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true);
    const [confirmRightIcon, setConfirmRightIcon] = useState('eye-off');
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const authLoading = useSelector((state) => state.emailSignup.runLoader)
    const data = useSelector((state) => state.emailSignup.data)
    const error = useSelector((state) => state.emailSignup.error)
    const dispatch = useDispatch();


    useEffect(() => {
        setIsLoading(authLoading)
        if (!authLoading && data != null) {
            navigation.navigate('VehicleInfo', { paramDriverId: data })
            ClientLayer.getInstance().getDataManager().SaveValueForKey('signup_id', JSON.stringify(data));
        }
        else if (!authLoading && error != null) {
            console.log(error)
            alert('Email Already Registered!')
        }
    }, [authLoading])
    const validate = () => {
        if ((licenseNumber == '') || (errorLicense != '')) {
            setErrorLicense('Please Input License Number!')
        }
        else if ((selectedDate == '') || (errorDate != '')) {
            setErrorDate('Please Input License Expiry Date!')
        }
        else if ((userPass == '') || (errorPass != '')) {
            seterrorPass('Please Input User Pass!')
        }
        else if ((userConfirmPass == '') || (errorConfirmPass != '')) {
            setErrorConfirmPass('Please Input User Confirm Pass!')
        }
        else {
             // import NetInfo from "@react-native-community/netinfo";
             NetInfo.fetch().then(state => {
                if (state.isInternetReachable === false) {
                    console.log('network not available!')
                    navigation.navigate('NetworkCheck')
                } else {
                    PostDriveDetails()
                }
            })
        }
    }
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
    const PostDriveDetails = () => {
        dispatch(registerUser({
            username: route.params.paramUserName, full_name: route.params.paramFullName,
            email: route.params.paramEmail, phone: route.params.paramPhone,
            cnic: route.params.paramCnic, license_number: licenseNumber,
            license_expiry: selectedDate, password: userPass,
            c_password: userConfirmPass,
        }))
    };

    return (
        <View style={styles.container}>
            <ScrollView showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.scrollViewStyle} contentContainerStyle={styles.contentContainer}>
                <View style={styles.HeaderView}>
                    <CustomBackArrow />
                    <Image style={{ resizeMode: 'contain' }}
                        source={require('../../assets/Images/FourELogoM.png')}>
                    </Image>
                    <Text style={styles.createtext}>
                        Register
                    </Text>
                </View>

                <View style={styles.TextInputSection}>
                    <View style={styles.TextInputField}>
                        <View style={styles.iconsandInputView}>
                            <FontAwesome name='drivers-license' size={20} color={Colors.getLightColor('whiteColor')} style={styles.inputIconStyle}>
                            </FontAwesome>
                            <TextInput
                                placeholder="License Number"
                                placeholderTextColor='#AAB9C7'
                                underlineColorAndroid={"#E4EDF5"}
                                keyboardType='decimal-pad'
                                onChangeText={txt => {
                                    if (txt.length > 0) {
                                        setErrorLicense('')
                                    }
                                    else if (txt == '') {
                                        setErrorLicense('Please Input License Number')
                                    }
                                    setLicenseNumber(txt);
                                }
                                }
                                style={styles.PlaceholderStyling}
                            />
                        </View>
                        <Text style={styles.errorText}>
                            {errorLicense}
                        </Text>
                    </View>

                    <View style={styles.TextInputField}>
                        <View style={styles.iconsandInputView}>
                            <MaterialIcons name='date-range' size={20} color={Colors.getLightColor('whiteColor')} style={styles.inputIconStyle}>
                            </MaterialIcons>
                            {showDate ?
                                (
                                    <View>
                                        <View>
                                            <TouchableOpacity onPress={() => { setOpen(true) }}
                                                style={styles.selectedDateOpacity}>
                                                <Text style={styles.selectedDateText}>
                                                    {selectedDate}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <DatePicker
                                            modal
                                            open={open}
                                            date={date}
                                            mode='date'

                                            onConfirm={(date) => {
                                                setSelectedDate(date.toISOString().split('T')[0])
                                                setOpen(false)
                                                setDate(date)
                                                setErrorDate('')
                                            }}
                                            onCancel={() => {
                                                setOpen(false)
                                            }}
                                        />
                                    </View>
                                )
                                :
                                (
                                    <View style={{ alignItems: 'center', backgroundColor: 'grey' }}>
                                        <View>
                                            <TouchableOpacity onPress={() => { setOpen(true) }}
                                                style={styles.licenseExpiryOpacity}>
                                                <Text style={styles.licenseExpiryText}>
                                                    License Expiry Date
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <DatePicker
                                            modal
                                            open={open}
                                            date={date}
                                            mode='date'
                                            onConfirm={(date) => {
                                                setSelectedDate(date.toISOString().split('T')[0])
                                                setOpen(false)
                                                setDate(date)
                                                setShowDate(true)
                                                setErrorDate('')
                                            }}
                                            onCancel={() => {
                                                setOpen(false)
                                            }}
                                        />
                                    </View>
                                )}
                        </View>
                        <Text style={styles.errorText}>
                            {errorDate}
                        </Text>
                    </View>

                    <View style={styles.TextInputField}>
                        <View style={styles.iconsandInputView}>
                            <SimpleLineIcons name='lock' size={20} color={Colors.getLightColor('whiteColor')} style={styles.inputIconStyle}>
                            </SimpleLineIcons>
                            <TextInput
                                placeholder="Password (A, a, @, #...)"
                                secureTextEntry={passwordVisibility}
                                placeholderTextColor='#AAB9C7'
                                underlineColorAndroid={"#E4EDF5"}
                                onChangeText={txt => {
                                    let reg = /^\S*$/;
                                    if (reg.test(txt) === false) {
                                        seterrorPass('White Spaces Not Allowed!!')
                                    }
                                    else if (txt.length > 0) {
                                        seterrorPass('')
                                        setUserPass(txt)
                                    }
                                    else if (txt == '') {
                                        seterrorPass('Please Input License Number')
                                    }
                                    else {
                                        seterrorPass("");
                                        setUserPass(txt)
                                    }
                                }}
                                style={styles.PlaceholderStyling}
                            />
                            <TouchableOpacity style={{ justifyContent: 'center' }}>
                                <MaterialCommunityIcons
                                    onPress={() => handlePasswordVisibility()} name={rightIcon} size={30} color={Colors.getLightColor('whiteColor')} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.errorText}>
                            {errorPass}
                        </Text>
                    </View>

                    <View style={styles.TextInputField}>
                        <View style={styles.iconsandInputView}>
                            <SimpleLineIcons name='lock' size={20} color={Colors.getLightColor('whiteColor')} style={styles.inputIconStyle}>
                            </SimpleLineIcons>
                            <TextInput
                                placeholder="Confirm Password"
                                placeholderTextColor='#AAB9C7'
                                secureTextEntry={confirmPasswordVisibility}
                                underlineColorAndroid={"#E4EDF5"}
                                onChangeText={txt => {
                                    if (txt != userPass) {
                                        setErrorConfirmPass("PassWord did not Matched!")
                                    }
                                    else if (txt.length > 0) {
                                        setErrorConfirmPass('')
                                        setUserConfirmPass(txt)
                                    }
                                    else if (txt == '') {
                                        setErrorConfirmPass('Please Input License Number')
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
                                    onPress={() => handleConfirmPasswordVisibility()} name={confirmRightIcon} size={30} color={Colors.getLightColor('whiteColor')} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.errorText}>
                            {errorConfirmPass}
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.policyText}>
                            By signing up, you’re agree to our {''}
                            <Text
                                onPress={() => { alert('Term  Conditions'); }}
                                style={styles.policiesText}>
                                Term {'&'} Conditions {''}
                            </Text>
                            and {''}
                            <Text
                                onPress={() => { alert('Privacy Policy'); }}
                                style={styles.policiesText}>
                                Privacy Policy
                            </Text>
                            .
                        </Text>
                    </View>
                </View>

                {/* <View style={{ height: Dimensions.get('window').height * 0.30, }}> */}
                <View style={{ justifyContent: 'center' }}>
                    {isLoading ?
                        (
                            <View style={styles.indicatorView}>
                                <ActivityIndicator size={'large'} color={Colors.getLightColor('secondaryColor')}></ActivityIndicator>
                            </View>
                        )
                        :
                        (
                            <View>
                                <TouchableOpacity onPress={() =>
                                    validate()
                                }
                                    style={styles.continueOpacity}>
                                    <Text style={styles.contnueText}>
                                        Continue
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    <View style={styles.BottomLineView}>
                        <Text style={styles.creatAccount}>
                            Already member |
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                            <Text style={styles.LoginTouch}>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomCarView}>
                        <Image source={require('../../assets/Images/carImage.png')}
                            style={styles.bottomCarStyle}>
                        </Image>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default EmailSignup;

