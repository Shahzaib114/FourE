import { View, Text, ScrollView, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator,Image,Modal, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react';
import styles from './style';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import ClientLayer from '../../../components/Layers/ClientLayer';
import Colors from '../../../utility/colors/Colors';
import CustomBackArrow from '../../CustomBackArrow';
import { _CustomerProfile } from '../../../store/Actions/CustomerProfile/CustomerProfile';
import { _CustomerProfileUpdate } from '../../../store/Actions/CustomerUpdateProfile/CustomerProfileUpdate';
import NetInfo from "@react-native-community/netinfo";
import AntDesign from 'react-native-vector-icons/AntDesign';

const CustomerProfileScreen = () => {
    const navigation = useNavigation();
    const [displayView, setDisplayView] = useState(true);
    const [profileData, setProfileData] = useState([])
    const [customerId, setCustomerId] = useState();
    const loading = useSelector((state) => state.profileData.runLoader)
    const data = useSelector((state) => state.profileData.data)
    const error = useSelector((state) => state.profileData.error)
    const dispatch = useDispatch();


    const [netModalVisible, setNetModalVisible] = useState(false)

    useEffect(() => {
        NetInfo.fetch().then(state => {
            if (state.isInternetReachable === false) {
                setNetModalVisible(true)
                
            } else {
                ClientLayer.getInstance().getDataManager().GetValueForKey('customer_id', result => {
                    setCustomerId(JSON.parse(result))
                    let id = JSON.parse(result)
                    dispatch(_CustomerProfile({ customer_id: id }))
                })
            }
        })
    }, []);

    useEffect(() => {
        setDisplayView(loading)
        if (!loading && data != null) {
            setProfileData(data)
        }
        else if (!loading && error != null) {
            console.log(error)
            alert(error)

        }
    }, [loading])

    const updateLoading = useSelector((state) => state.CustProfileUpdate.runLoader)
    const updateData = useSelector((state) => state.CustProfileUpdate.data)
    const updateError = useSelector((state) => state.CustProfileUpdate.error)
    const [UpdateIsLoading, setUpdateIsLoading] = useState(false);

    useEffect(() => {
        setUpdateIsLoading(updateLoading)
        console.log(updateData)
        if (!updateLoading && updateData != null) {
            alert(updateData)
        }
        else if (!updateLoading && updateError != null) {
            alert('Kindly Add Some Information to Update!')
        }
    }, [updateLoading]);

    const postDriverUpdatedData = () => {
        if (userName == '' && userMail === '' && userNumber === '' && profileImage.length === 0) {
            alert('please add some data to update')
        } else {
            if (profileImage.length == 0) {
                dispatch(_CustomerProfileUpdate({
                    full_name: userName,
                    email_id: userMail,
                    phone: userNumber,
                    password: userPassword,
                    profile_pic: null,
                    id: customerId,
                }))
            }
            else {
                dispatch(_CustomerProfileUpdate({
                    full_name: userName,
                    email_id: userMail,
                    phone: userNumber,
                    password: userPassword,
                    profile_pic: profileImage,
                    id: customerId,
                }))
            }
        }
    }

    const [profileImage, setprofileImage] = useState('');
    const [userFullName, setUserFullName] = useState('');
    const [userMail, setUserMail] = useState('');
    const [userNumber, setUserNumber] = useState('');
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const selectProfileImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 200,
            cropping: true
        }).then(image => {
            console.log(image);
            setprofileImage(image.path);
        }).catch((callBack) => {
            console.log(callBack);
        });
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
                                onPress={() => { setNetModalVisible(false),navigation.goBack() }} >
                                <Text style={styles.netOkText}>
                                    Ok
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.contentContainer}>
                <View style={styles.mainView}>
                    <CustomBackArrow />
                </View>
                {displayView ?
                    (
                        <View style={styles.indicator}>
                            <ActivityIndicator size={'large'} color='black'></ActivityIndicator>
                        </View>
                    )
                    :
                    (
                        <View style={styles.mainContainer}>
                            <View style={styles.imageHeaderView}>
                                {profileImage?.length == 0 ?
                                    (
                                        <ImageBackground source={require('../../../assets/Images/user.png')}
                                            style={styles.beforeImageStyle}
                                            imageStyle={{ borderRadius: 30 }}
                                        >
                                            <TouchableOpacity style={{backgroundColor:Colors.getLightColor('verticalLineColor'), borderRadius:5}} onPress={() => selectProfileImage()}>
                                                <SimpleLineIcons name='camera' size={20} color={Colors.getLightColor('primaryColor')} style={styles.camerIconStyle} />
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    )
                                    :
                                    (
                                        <ImageBackground source={{ uri: profileImage }}
                                            style={styles.beforeImageStyle}
                                            imageStyle={{ borderRadius: 30 }}>
                                            <TouchableOpacity onPress={() => selectProfileImage()}>
                                                <SimpleLineIcons name='camera' size={20} color={Colors.getLightColor('primaryColor')} style={styles.camerIconStyle} />
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    )
                                }
                            </View>
                            <View style={styles.inputMainView}>
                                <View style={styles.textualInputscndryView}>
                                    <View style={{ width: '47.5%' }}>
                                        <Text style={styles.namesText}>
                                            First Name
                                        </Text>
                                        <View style={styles.TextInputField}>
                                            <TextInput
                                                placeholder={profileData.first_name}
                                                placeholderTextColor={Colors.getLightColor('blackColor')}
                                                style={styles.PlaceholderStyling}
                                                onChangeText={(txt) => {
                                                    setUserName(txt)
                                                }}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.lastNameView}>
                                        <Text style={styles.namesText}>
                                            Last Name
                                        </Text>
                                        <View style={styles.TextInputField}>
                                            <TextInput
                                                placeholder={profileData.last_name}
                                                placeholderTextColor={Colors.getLightColor('blackColor')}
                                                style={styles.PlaceholderStyling}
                                                onChangeText={(txt) => {
                                                    setUserFullName(txt)
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.emailandphoneView}>
                                    <Text style={styles.namesText}>
                                        Email
                                    </Text>
                                    <View style={styles.TextInputField}>
                                        <TextInput
                                            placeholder={profileData.email}
                                            placeholderTextColor={Colors.getLightColor('blackColor')}
                                            style={styles.PlaceholderStyling}
                                            onChangeText={(txt) => {
                                                setUserMail(txt)
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={styles.emailandphoneView}>
                                    <Text style={styles.namesText}>
                                        Phone Number
                                    </Text>
                                    <View style={styles.TextInputField}>
                                        <TextInput
                                            placeholder={profileData.phone}
                                            placeholderTextColor={Colors.getLightColor('blackColor')}
                                            style={styles.PlaceholderStyling}
                                            onChangeText={(txt) => {
                                                setUserNumber(txt)
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginVertical: '2%' }}>
                                {UpdateIsLoading ?
                                    (
                                        <View style={{ margin: '2%' }}>
                                            <ActivityIndicator size={'large'} color='black'></ActivityIndicator>
                                        </View>
                                    )
                                    :
                                    (
                                        <View>
                                            <TouchableOpacity onPress={() =>
                                                postDriverUpdatedData()
                                            }
                                                style={styles.continueOpacity}>
                                                <Text style={styles.contnueText}>
                                                    Update Profile
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                    )}
            </ScrollView>
        </View>
    )
};
export default CustomerProfileScreen