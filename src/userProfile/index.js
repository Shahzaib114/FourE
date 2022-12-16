import { View, Text, ScrollView, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react';
import styles from './style';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import Colors from '../../utility/colors/Colors';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDriverProfileDetails } from '../../store/Actions/getUserProfile/getUserProfileData';
import { PostDriverUpdatedProfile } from '../../store/Actions/DriverUpdatedData/postDriverDataUpdate';
import CustomBackArrow from '../CustomBackArrow';
import ClientLayer from '../../components/Layers/ClientLayer';
const ProfileScreen = ({ route }) => {
    const navigation = useNavigation();
    const [displayView, setDisplayView] = useState(true);
    const [profileData, setProfileData] = useState([])
    const [driverId, setDriverId] = useState();
    const loading = useSelector((state) => state.driverProfile.runLoader)
    const data = useSelector((state) => state.driverProfile.data)
    const error = useSelector((state) => state.driverProfile.error)
    const dispatch = useDispatch();
    useEffect(() => {
        ClientLayer.getInstance().getDataManager().GetValueForKey('driver_id', result => {
            setDriverId(JSON.parse(result))
            dispatch(fetchDriverProfileDetails({ driver_id: JSON.parse(result) }))
        })
    }, []);
    useEffect(() => {
        setDisplayView(loading)
        if (!loading && data != null) {
            setProfileData(data)
        }
        else if (!loading && error != null) {
            alert('Credentials are Wrong')

        }
    }, [loading])
    const updateLoading = useSelector((state) => state.driverProfileUpdate.runLoader)
    const updateData = useSelector((state) => state.driverProfileUpdate.data)
    const updateError = useSelector((state) => state.driverProfileUpdate.error)
    const [UpdateIsLoading, setUpdateIsLoading] = useState(false);
    useEffect(() => {
        setUpdateIsLoading(updateLoading)
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
                dispatch(PostDriverUpdatedProfile({
                    full_name: userName,
                    email_id: userMail,
                    phone: userNumber,
                    password: userPassword,
                    profile_pic: null,
                    id: driverId,
                }))
            }
            else {
                dispatch(PostDriverUpdatedProfile({
                    full_name: userName,
                    email_id: userMail,
                    phone: userNumber,
                    password: userPassword,
                    profile_pic: profileImage,
                    id: driverId,
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
            <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.contentContainer}>
                <View style={styles.mainView}>
                    <CustomBackArrow />
                </View>
                {displayView ?
                    (
                        <View style={{ alignSelf: 'center', justifyContent: 'center', height: Dimensions.get('window').height * 0.95, }}>
                            <ActivityIndicator size={'large'} color='black'></ActivityIndicator>
                        </View>
                    )
                    :
                    (
                        <View style={{ height: Dimensions.get('window').height * 0.90, justifyContent: 'space-around' }}>
                            <View style={styles.imageHeaderView}>
                                {profileImage?.length == 0 ?
                                    (
                                        <ImageBackground source={require('../../assets/Images/user.png')}
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
                                                placeholder={profileData.full_name}
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
                                                placeholder={profileData.full_name}
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
                                            placeholder={profileData.license_number}
                                            placeholderTextColor={Colors.getLightColor('blackColor')}
                                            style={styles.PlaceholderStyling}
                                            onChangeText={(txt) => {
                                                setUserNumber(txt)
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={styles.emailandphoneView}>
                                    <Text style={styles.namesText}>
                                        Password
                                    </Text>
                                    <View style={styles.TextInputField}>
                                        <TextInput
                                            placeholder={profileData.license_number}
                                            placeholderTextColor={Colors.getLightColor('blackColor')}
                                            style={styles.PlaceholderStyling}
                                            onChangeText={(txt) => {
                                                console.log(txt)
                                                setUserPassword(txt)
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
                            <View>
                                <TouchableOpacity onPress={() =>
                                alert("Feature Under Maintenance!")
                                    // navigation.navigate('VehicleInfo',
                                    //     {
                                    //         paramSkip: true,
                                    //         paramSkipId: driverId
                                    //     }
                                    // )
                                }
                                    style={styles.continueOpacity}>
                                    <Text style={styles.contnueText}>
                                        Update Vehicle Details
                                    </Text>
                                    <AntDesign name='forward' color={Colors.getLightColor('whiteColor')} size={15}
                                        style={{ marginHorizontal: '5%' }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
            </ScrollView>
        </View>
    )
};
export default ProfileScreen;