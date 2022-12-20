
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator, Platform, Dimensions, Modal } from 'react-native'
import React, { useState, useEffect, Alert } from 'react';
import styles from './style';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import ClientLayer from '../../../components/Layers/ClientLayer';
import Colors from '../../../utility/colors/Colors';
import { CustomerSignupDetails } from '../../../store/Actions/CustomerSignup/CustomerSignup';
import NetInfo from "@react-native-community/netinfo";
import AntDesign from 'react-native-vector-icons/AntDesign';

const CustomerSignup = ({ navigation, route }) => {
    const [userFirstName, setUserFirstName] = useState('');
    const [userFirstNameError, setUserFirstNameError] = useState('');

    const [userLastName, setUserLastName] = useState('');
    const [userLastNameError, setUserLastNameError] = useState('');

    const [userPhone, setuserPhone] = useState('');
    const [usermail, setUserMail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [userConfirmPass, setUserConfirmPass] = useState('');
    const [errorphone, setErrorPhone] = useState('');
    const [errorMail, setErrorMail] = useState('');
    const [errorConfirmPass, setErrorConfirmPass] = useState('');
    const [errorPass, seterrorPass] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye-off');
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true);
    const [confirmRightIcon, setConfirmRightIcon] = useState('eye-off');
    const [isLoading, setIsLoading] = useState(false);

    const authLoading = useSelector((state) => state.customerSignup.runLoader)
    const data = useSelector((state) => state.customerSignup.data)
    const error = useSelector((state) => state.customerSignup.error)
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(authLoading)
        if (!authLoading && data != null) {
            if (data.data === 'Validation Error.') {
                alert('Email is Already Registered')
            } else {
                ClientLayer.getInstance().getDataManager().SaveValueForKey('email', JSON.stringify(data.data.email));
                ClientLayer.getInstance().getDataManager().SaveValueForKey('customer_id', JSON.stringify(data.data.id));
                navigation.navigate('CustomerSignupOTP')
            }
        }
        else if (!authLoading && error != null) {
            alert('Credentials are Wrong', error)
        }
    }, [authLoading])

    const [netModalVisible, setNetModalVisible] = useState(false)

    const validate = () => {
        let reg = /^\S*$/;
        if ((userFirstName == '') || (userFirstNameError != '')) {
            setUserFirstNameError('Please add FirstName')
        }
        else if ((userLastName == '') || (userLastNameError != '')) {
            setUserLastNameError('Please add LastName')
        }
        else if ((userPhone == '') || (errorphone != '')) {
            setErrorPhone('Please add Phone Number')
        }
        else if ((usermail == '') || (errorMail != '')) {
            setErrorMail('Please add Email')
        }
        else if ((userPass == '') || (errorPass != '')) {
            seterrorPass('Please add Password')
        }
        else if ((userConfirmPass == '') || (errorConfirmPass != '')) {
            setErrorConfirmPass('Please add Confirm Password')
        }else{
            PostDriveDetails()
        }
        // if ((userPass.length == 0) || (userConfirmPass.length == 0) || (userFirstName.length == 0) || (userLastName.length == 0)) {
        //     alert('Please fill the Empty field!')
        // }
        // else if ((errorPass != '') || (errorConfirmPass != '') || (errorphone != '') || (errorMail != '')) {
        //     alert('Please enter correct data!')
        // }
        // else {
        //     // import NetInfo from "@react-native-community/netinfo";
        //       NetInfo.fetch().then(state => {
        //         if (state.isInternetReachable === false) {
        //             setNetModalVisible(true)    
        //         } else {
        //             PostDriveDetails()
        //         }
        //     })
        // }
    }

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        }
    }

    const handleConfirmPasswordVisibility = () => {
        if (confirmRightIcon === 'eye-off') {
            setConfirmRightIcon('eye');
            setConfirmPasswordVisibility(!confirmPasswordVisibility);
        } else if (confirmRightIcon === 'eye') {
            setConfirmRightIcon('eye-off');
            setConfirmPasswordVisibility(!confirmPasswordVisibility);
        }
    }

    const PostDriveDetails = () => {
        dispatch(CustomerSignupDetails({
            first_name: userFirstName, last_name: userLastName,
            email: usermail, phone: userPhone,
            password: userPass,
            c_password: userConfirmPass,
        }))
    }

    return (
        <View style={styles.container}>
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

            <ScrollView showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.scrollViewStyle} contentContainerStyle={styles.contentContainer}>
                <View style={styles.HeaderView}>
                    <Image style={{ resizeMode: 'contain' }}
                        source={require('../../../assets/Images/FourELogoM.png')}>
                    </Image>
                    <Text style={styles.createtext}>
                        Register
                    </Text>
                </View>

                <View style={styles.TextInputSection}>
                    <View style={styles.TextInputField}>
                        <View style={styles.iconsandInputView}>
                            <FontAwesome name='user' size={30} color={Colors.getLightColor('whiteColor')} style={styles.inputIconStyle}>
                            </FontAwesome>
                            <TextInput
                                placeholder="First Name"
                                placeholderTextColor='#AAB9C7'
                                underlineColorAndroid={"#E4EDF5"}
                                keyboardType='default'
                                onChangeText={txt => {
                                    if (txt.length > 0) {
                                        setUserFirstNameError('')
                                    }
                                    else if (txt == '') {
                                        setUserFirstNameError('Please add FirstName')
                                    }
                                    setUserFirstName(txt)
                                }}
                                style={styles.PlaceholderStyling}
                            >
                            </TextInput>
                        </View>
                        <Text style={styles.errorText}>
                            {userFirstNameError}
                        </Text>
                    </View>

                    <View style={styles.TextInputField}>
                        <View style={styles.iconsandInputView}>
                            <FontAwesome name='user-o' size={25} color={Colors.getLightColor('whiteColor')} style={styles.inputIconStyle}>
                            </FontAwesome>
                            <TextInput
                                placeholder="Last Name"
                                placeholderTextColor='#AAB9C7'
                                underlineColorAndroid={"#E4EDF5"}
                                keyboardType='default'
                                onChangeText={txt => {
                                    if (txt.length > 0) {
                                        setUserLastNameError('')
                                    }
                                    else if (txt == '') {
                                        setUserLastNameError('Please add LastName')
                                    }
                                    setUserLastName(txt)
                                }}
                                style={styles.PlaceholderStyling}
                            />
                        </View>
                        <Text style={styles.errorText}>
                            {userLastNameError}
                        </Text>
                    </View>

                    <View style={styles.TextInputField}>
                        <View style={styles.iconsandInputView}>
                            <FontAwesome name='phone' size={30} color={Colors.getLightColor('whiteColor')} style={styles.inputIconStyle}>
                            </FontAwesome>
                            <TextInput
                                placeholder="Phone"
                                placeholderTextColor='#AAB9C7'
                                underlineColorAndroid={"#E4EDF5"}
                                keyboardType='decimal-pad'
                                onChangeText={txt => {
                                    if (txt.length < 10) {
                                        setErrorPhone('Number Not Correct')
                                    }
                                    else if (txt.length > 0) {
                                        setErrorPhone('')
                                    }
                                    else if (txt == '') {
                                        setErrorPhone('Please add FirstName')
                                    }
                                    setuserPhone(txt)
                                }}
                                style={styles.PlaceholderStyling}
                            />
                        </View>
                        <Text style={styles.errorText}>
                            {errorphone}
                        </Text>
                    </View>

                    <View style={styles.TextInputField}>
                        <View style={styles.iconsandInputView}>
                            <MaterialIcons name='alternate-email' size={25} color={Colors.getLightColor('whiteColor')} style={styles.inputIconStyle}>
                            </MaterialIcons>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor='#AAB9C7'
                                underlineColorAndroid={"#E4EDF5"}
                                keyboardType='email-address'
                                onChangeText={txt => {
                                    let reg = /^\S*$/;
                                    if (reg.test(txt) === false) {
                                        setErrorMail('White Spaces Not Allowed!!')
                                    }
                                    else if (txt.length > 0) {
                                        setErrorMail('')
                                    }
                                    else if (txt == '') {
                                        setErrorMail('Please add FirstName')
                                    }
                                    setUserMail(txt)
                                }}
                                style={styles.PlaceholderStyling}
                            />
                        </View>
                        <Text style={styles.errorText}>
                            {errorMail}
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
                                    }
                                    else if (txt == '') {
                                        seterrorPass('Please add User Password')
                                    }
                                    setUserPass(txt)
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
                                    let reg = /^\S*$/;
                                    if (reg.test(txt) === false) {
                                        setErrorConfirmPass('White Spaces Not Allowed!!')
                                    }
                                    else if (txt != userPass) {
                                        setErrorConfirmPass("PassWord did not Matched!")
                                    }
                                    else if (txt.length > 0) {
                                        setErrorConfirmPass('')
                                    }
                                    else if (txt == '') {
                                        setErrorConfirmPass('Please add User Password')
                                    }
                                    setUserConfirmPass(txt)
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
                                style={styles.termsConditionText}>
                                Term {'&'} Conditions {''}
                            </Text>
                            and {''}
                            <Text
                                onPress={() => { alert('Privacy Policy'); }}
                                style={styles.privacyText}>
                                Privacy Policy
                            </Text>
                            .
                        </Text>
                    </View>
                </View>

                <View>
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
                        <Image source={require('../../../assets/Images/carImage.png')}
                            style={styles.bottomCarStyle}>
                        </Image>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default CustomerSignup;

