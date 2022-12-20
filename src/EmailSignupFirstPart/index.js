
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, Linking, KeyboardAvoidingView, Platform, Dimensions, ToastAndroid } from 'react-native'
import React, { Component, useState, useEffect, Alert } from 'react';
import styles from './style';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ClientLayer from '../../components/Layers/ClientLayer';
import Colors from '../../utility/colors/Colors';

const EmailSignupFirstPart = ({ navigation, route }) => {
    const [usermail, setUserMail] = useState('');
    const [errorMail, setErrorMail] = useState('');

    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState('');

    const [userFullName, setUserFullName] = useState('');
    const [userFullNameError, setUserFullNameError] = useState('');

    const [userPhone, setUserPhone] = useState('');
    const [errorPhone, setErrorPhone] = useState('');


    const [userCnic, setUserCnic] = useState('');
    const [errorCNIC, setErrorCNIC] = useState('');


    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        if ((userName == '') || (userNameError != '')) {
            setUserNameError('Please Input Username')
        }
        else if ((userFullName == '') || (userFullNameError != '')) {
            setUserFullNameError('Please Input FullName')
        }
        else if ((usermail == '') || (errorMail != '')) {
            setErrorMail('Please Input Mail!')
        }
        else if ((userPhone == '') || (errorPhone != '')) {
            setErrorPhone('Please Input Phone Number')
        }
        else if ((userCnic == '') || (errorCNIC != '')) {
            setErrorCNIC('Please Input CNIC')
        }
        else {
            ClientLayer.getInstance().getDataManager().SaveValueForKey('email', JSON.stringify(usermail));
            navigation.navigate('EmailSignup', {
                paramUserName: userName,
                paramFullName: userFullName,
                paramEmail: usermail,
                paramPhone: userPhone,
                paramCnic: userCnic,
            })
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.contentContainer}>
                <View style={styles.headerView}>
                    <Image
                        source={require('../../assets/Images/FourELogoM.png')}>
                    </Image>
                    <Text style={styles.createtext}>
                        Register
                    </Text>
                </View>
                <View style={styles.TextInputSection}>
                    <View style={styles.TextInputField}>
                        <View style={styles.iconsandInputView}>
                            <Feather name='user' size={20} color={Colors.getLightColor('whiteColor')} style={styles.inputIconStyle}>
                            </Feather>
                            <TextInput
                                placeholder="User Name"
                                placeholderTextColor='#AAB9C7'
                                underlineColorAndroid={"#E4EDF5"}
                                onChangeText={txt => {
                                    if (txt.length > 0) {
                                        setUserNameError('')
                                    }
                                    else if (txt == '') {
                                        setUserNameError('Please Input Username')
                                    }
                                    setUserName(txt)
                                }}
                                style={styles.PlaceholderStyling}
                            >
                            </TextInput>
                        </View>
                        <Text style={styles.errorText}>
                            {userNameError}
                        </Text>
                    </View>

                    <View style={styles.TextInputField}>
                        <View style={styles.iconsandInputView}>
                            <FontAwesome name='user' size={20} color={Colors.getLightColor('whiteColor')} style={styles.inputIconStyle}>
                            </FontAwesome>
                            <TextInput
                                placeholder="Full Name"
                                placeholderTextColor='#AAB9C7'
                                underlineColorAndroid={"#E4EDF5"}
                                onChangeText={txt => {
                                    if (txt.length > 0) {
                                        setUserFullNameError('')
                                    }
                                    else if (txt == '') {
                                        setUserFullNameError('Please Input Full Name')
                                    }
                                    setUserFullName(txt)
                                }
                                }
                                style={styles.PlaceholderStyling}
                            >
                            </TextInput>
                        </View>
                        <Text style={styles.errorText}>
                            {userFullNameError}
                        </Text>
                    </View>

                    <View style={styles.TextInputField}>
                        <View style={styles.iconsandInputView}>
                            <Feather name='at-sign' size={20} color={Colors.getLightColor('whiteColor')} style={styles.inputIconStyle}>
                            </Feather>
                            <TextInput
                                placeholder="Email ID"
                                placeholderTextColor='#AAB9C7'
                                underlineColorAndroid={"#E4EDF5"}
                                onChangeText={txt => {
                                    if (txt.length > 0) {
                                        setErrorMail('')
                                    }
                                    else if (txt == '') {
                                        setErrorMail('Please Input Email ID')
                                    }
                                    setUserMail(txt)
                                }}
                                style={styles.PlaceholderStyling}
                            >
                            </TextInput>
                        </View>
                        <Text style={styles.errorText}>
                            {errorMail}
                        </Text>
                    </View>

                    <View style={styles.TextInputField}>
                        <View style={styles.iconsandInputView}>
                            <Feather name='phone' size={20} color={Colors.getLightColor('whiteColor')} style={styles.inputIconStyle}>
                            </Feather>
                            <TextInput
                                placeholder="Mobile"
                                keyboardType='phone-pad'
                                placeholderTextColor='#AAB9C7'
                                underlineColorAndroid={"#E4EDF5"}
                                onChangeText={txt => {
                                    if (txt.length < 11) {
                                        setErrorPhone('Phone Number is not Correct');
                                    }
                                    else if (txt.length > 0) {
                                        setErrorPhone('')
                                    }
                                    else if (txt == '') {
                                        setErrorPhone('Please Input Phone')
                                    }
                                    else {
                                        setErrorPhone('');
                                        setUserPhone(txt);
                                    }
                                    setUserPhone(txt);
                                }}
                                style={styles.PlaceholderStyling}
                            />
                        </View>
                        <Text style={styles.errorText}>
                            {errorPhone}
                        </Text>
                    </View>

                    <View style={styles.TextInputField}>
                        <View style={styles.iconsandInputView}>
                            <Feather name='user' size={18} color={Colors.getLightColor('whiteColor')} style={styles.userInputIcon}>
                            </Feather>
                            <TextInput
                                placeholder="CNIC without(-)"
                                placeholderTextColor='#AAB9C7'
                                underlineColorAndroid={"#E4EDF5"}
                                keyboardType='decimal-pad'
                                onChangeText={txt => {
                                    if (txt.length != 13) {
                                        setErrorCNIC('CNIC is Not Correct')
                                    }
                                    else if (txt.length > 0) {
                                        setErrorCNIC('')
                                    }
                                    else if (txt == '') {
                                        setErrorCNIC('Please Input CNIC')
                                    }
                                    else {
                                        setErrorCNIC('');
                                        setUserCnic(txt);
                                    }
                                    setUserCnic(txt);
                                }
                                }
                                style={styles.PlaceholderStyling}
                            />
                        </View>
                        <Text style={styles.errorText}>
                            {errorCNIC}
                        </Text>
                    </View>
                </View>

                <View>
                    {isLoading ?
                        (
                            <View style={styles.indicatorView}>
                                <ActivityIndicator size={'large'} color='black'>

                                </ActivityIndicator>
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
                    <Image source={require('../../assets/Images/carImage.png')}
                        style={styles.bottomImageStyle}>
                    </Image>
                </View>
            </ScrollView>
        </View>
    )
}
export default EmailSignupFirstPart;

