import React, { useState, useEffect } from 'react';
import {
    Text,
    Image,
    View,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    Dimensions,
    PermissionsAndroid,
    ActivityIndicator,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles';
import CustomBackArrow from '../CustomBackArrow';
import Colors from '../../utility/colors/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { DriverVehicleDetails } from '../../store/Actions/vehicleInfo/uploadVehiceInformartion';
import ClientLayer from '../../components/Layers/ClientLayer';
import NetInfo from "@react-native-community/netinfo";
import AntDesign from 'react-native-vector-icons/AntDesign';

const UploadFiles = ({ navigation, route }) => {
    const [cnicFrontImage, setCnicFrontImage] = useState('');
    const [cnicBackImage, setCnicBackImage] = useState('');
    const [licenseFrontImage, setlicenseFrontImage] = useState('');
    const [licenseBackImage, setLicenseBackImage] = useState('');
    const [profileImage, setprofileImage] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [checkFunction, setCheckFunction] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState();
    const authLoading = useSelector((state) => state.vehicleDetals.runLoader)
    const data = useSelector((state) => state.vehicleDetals.data)
    const error = useSelector((state) => state.vehicleDetals.error)
    const dispatch = useDispatch()
    const galleryPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");

            }
            else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }
    useEffect(() => {
        setIsLoading(authLoading)
        ClientLayer.getInstance().getDataManager().GetValueForKey('signup_id', result => {
            if ((route.params.paramServiceType == true) && (route.params.paramSkipId != undefined)) {
                setUserId(route.params.paramSkipId)
            }
            else if (route.params.paramSkipId == undefined) {
                setUserId(JSON.parse(result))
            }
            else {
                console.log('its all')
            }
        })
        if (!authLoading && data != null) {
            if ((route.params.paramServiceType == true) && (route.params.paramSkipId != undefined)) {
                console.log('coming from profile, and navigate now')
                alert('Profile has been updated!')
                navigation.navigate('ProfileScreen')
            }
            else if (route.params.paramSkipId == undefined) {
                console.log('coming from signup, and navigate now')
                navigation.navigate('ConfirmPass')
            }
        }
        else if (!authLoading && error != null) {
            alert('Credentials are Wrong')
        }
    }, [authLoading]);

    const [netModalVisible, setNetModalVisible] = useState(false)

    const postVehicleDetails = () => {
        if (cnicFrontImage.length === 0) {
            alert('Please Add CNIC Front Image!')
        }
        else if (cnicBackImage.length === 0) {
            alert('Please Add CNIC Back Image!')
        }
        else if (licenseFrontImage.length === 0) {
            alert('Please Add License Front Image!')
        }
        else if (licenseBackImage.length === 0) {
            alert('Please Add License Back Image!')
        }
        else if (profileImage.length === 0) {
            alert('Please Add Your Profile Picture!')
        }
        else {
            // import NetInfo from "@react-native-community/netinfo";
            NetInfo.fetch().then(state => {
                if (state.isInternetReachable === false) {
                    setNetModalVisible(true)
                } else {
                    dispatch(DriverVehicleDetails({
                        service_type: route.params.paramServiceType, vehicle_number: route.params.paramNumber,
                        vehicle_model: route.params.paramModel, vehicle_color: route.params.paramColor,
                        vehicle_make: route.params.paramMake, token_tax: route.params.paramTokenTax,
                        driver_id: userId,
                        interior_pic_path: route.params.paramInreriorImages,
                        exterior_pic_path: route.params.paramExteriorImages,
                        cnic_front: cnicFrontImage, cnic_back: cnicBackImage,
                        license_front: licenseFrontImage, license_back: licenseBackImage,
                        profile_pic: profileImage
                    }))
                }
            })
        }
    }

    const chechCameraOrGalleryFunction = (text) => {
        if ((text === 'c') && (checkFunction == 'cf')) {
            CnicFrontCheck(text)
        }
        else if ((text === 'c') && (checkFunction == 'cb')) {
            CnicBackCheck(text)
        }
        else if ((text === 'c') && (checkFunction == 'Lf')) {
            LicenseFrontCheck(text)
        }
        else if ((text === 'c') && (checkFunction == 'Lb')) {
            LicenseBackCheck(text)
        }
        else if ((text === 'c') && (checkFunction == 'Profile')) {
            ProfileCheck(text)
        }

        //responsible for selecting images from Gallery 
        if ((text === 'g') && (checkFunction == 'cf')) {
            CnicFrontCheck(text)
        }
        else if ((text === 'g') && (checkFunction == 'cb')) {
            CnicBackCheck(text)
        }
        else if ((text === 'g') && (checkFunction == 'Lf')) {
            LicenseFrontCheck(text)
        }
        else if ((text === 'g') && (checkFunction == 'Lb')) {
            LicenseBackCheck(text)
        }
        else if ((text === 'g') && (checkFunction == 'Profile')) {
            ProfileCheck(text)
        }
    }
    const CnicFrontCheck = (check) => {
        if (check == 'c') {
            setModalVisible(false)
            try {
                ImagePicker.openCamera(
                    {
                        width: 300,
                        height: 400,
                        cropping: true,
                    }).then(image => {
                        // console.log(image);
                        setCnicFrontImage(image.path);
                    }).catch((callBack) => {
                        console.log(callBack);
                    });

            } catch (error) {
                console.log(error)
            }
        }
        else {
            setModalVisible(false)
            try {
                ImagePicker.openPicker({
                    width: 300,
                    height: 200,
                    cropping: true
                }).then(image => {
                    // console.log(image);
                    setCnicFrontImage(image.path);
                }).catch((callBack) => {
                    console.log(callBack);
                });
            } catch (error) {
                console.log(err);
            }
        }

    }

    const CnicBackCheck = (check) => {
        if (check == 'c') {
            setModalVisible(false)
            try {
                ImagePicker.openCamera({
                    width: 300,
                    height: 400,
                    cropping: true,
                }).then(image => {
                    setCnicBackImage(image.path);
                }).catch((callBack) => {
                    console.log(callBack);
                });
            } catch (error) {
                console.log(err);
            }
        }
        else {
            try {
                setModalVisible(false)
                ImagePicker.openPicker({
                    width: 300,
                    height: 200,
                    cropping: true
                }).then(image => {
                    // console.log(image);
                    setCnicBackImage(image.path);
                }).catch((callBack) => {
                    console.log(callBack);
                });
            } catch (error) {
                console.log(err);
            }
        }
    }
    const LicenseFrontCheck = (check) => {
        if (check == 'c') {
            setModalVisible(false)
            try {
                ImagePicker.openCamera({
                    width: 300,
                    height: 400,
                    cropping: true,
                }).then(image => {
                    setlicenseFrontImage(image.path);
                }).catch((callBack) => {
                    console.log(callBack);
                });
            } catch (error) {
                console.log(err);
            }
        }
        else {
            setModalVisible(false)
            try {
                ImagePicker.openPicker({
                    width: 300,
                    height: 200,
                    cropping: true
                }).then(image => {
                    // console.log(image);
                    setlicenseFrontImage(image.path);
                }).catch((callBack) => {
                    console.log(callBack);
                });
            } catch (error) {
                console.log(err);
            }
        }
    }

    const LicenseBackCheck = (check) => {
        if (check == 'c') {
            setModalVisible(false)
            try {
                ImagePicker.openCamera({
                    width: 300,
                    height: 400,
                    cropping: true,
                }).then(image => {
                    setLicenseBackImage(image.path);
                }).catch((callBack) => {
                    console.log(callBack);
                });
            } catch (error) {
                console.log(err);
            }
        }
        else {
            setModalVisible(false)
            try {
                ImagePicker.openPicker({
                    width: 300,
                    height: 200,
                    cropping: true

                }).then(image => {
                    // console.log(image);
                    setLicenseBackImage(image.path);
                }).catch((callBack) => {
                    console.log(callBack);
                });
            } catch (error) {
                console.log(err);
            }
        }
    }

    const ProfileCheck = (check) => {
        if (check == 'c') {
            setModalVisible(false)
            try {
                ImagePicker.openCamera({
                    width: 300,
                    height: 400,
                    cropping: true,
                }).then(image => {
                    setprofileImage(image.path);
                }).catch((callBack) => {
                    console.log(callBack);
                });
            } catch (error) {
                console.log(err);
            }
        }
        else {
            setModalVisible(false)
            try {
                ImagePicker.openPicker({
                    width: 300,
                    height: 200,
                    cropping: true

                }).then(image => {
                    // console.log(image);
                    setprofileImage(image.path);
                }).catch((callBack) => {
                    console.log(callBack);
                });
            } catch (error) {
                console.log(err);
            }
        }
    }
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
            <ScrollView style={{ backgroundColor: Colors.getLightColor('primaryColor') }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ height: Dimensions.get("screen").height * 0.75, }}>
                    <CustomBackArrow />
                    <Text style={styles.uploadFilesText}>
                        Upload Files
                    </Text>
                    <Modal isVisible={isModalVisible}>
                        <View style={styles.ModalStyle}>
                            <TouchableOpacity
                                onPress={() => chechCameraOrGalleryFunction('c')}
                                style={styles.cameraOpacity}>
                                <EvilIcons name='camera' size={30} color="white" >
                                </EvilIcons>
                                <Text style={styles.contnueText}>
                                    OPEN CAMERA
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { chechCameraOrGalleryFunction('g') }}
                                style={styles.galleryOpacity}>
                                <SimpleLineIcons name='picture' size={20} color="white">
                                </SimpleLineIcons>
                                <Text style={styles.contnueText} >
                                    OPEN GALLERY
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)}
                                style={styles.cancelOpacity}>
                                <Text
                                    style={styles.contnueText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <View style={styles.imagesMainView}>
                        <View style={{
                            width: Dimensions.get("screen").width * 0.46,
                            height: Dimensions.get("screen").height * 0.15,
                        }}>
                            <Text style={styles.imageText}>
                                CNIC Front
                            </Text>
                            {cnicFrontImage?.length == 0 ?
                                (
                                    <TouchableOpacity onPress={() => {
                                        setModalVisible(true)
                                        setCheckFunction('cf')
                                    }}
                                        style={styles.beforeImageOpacity}
                                    >
                                        <Image source={require('../../assets/Images/imglogo.png')}
                                            style={styles.beforeImageStyle}>
                                        </Image>
                                    </TouchableOpacity>
                                )
                                :
                                (
                                    <View
                                        style={styles.afterImageView}>
                                        <ImageBackground source={{ uri: cnicFrontImage }}
                                            style={styles.afterImageStyle} imageStyle={{ borderRadius: 10 }}
                                        >
                                            <TouchableOpacity onPress={() => {
                                                setModalVisible(true)
                                                setCheckFunction('cf')
                                            }}
                                            >
                                                <Feather name='edit' size={15} color='#AAB9C7' style={styles.afterImageeditButton}>
                                                </Feather>
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    </View>
                                )
                            }
                        </View>
                        <View style={{
                            width: Dimensions.get("screen").width * 0.46,
                            height: Dimensions.get("screen").height * 0.15,
                            marginBottom: '3%'
                        }}>
                            <Text style={styles.imageText}>
                                CNIC Back
                            </Text>
                            {cnicBackImage?.length == 0 ?
                                (
                                    <TouchableOpacity onPress={() => {
                                        setModalVisible(true)
                                        setCheckFunction('cb')
                                    }}
                                        style={styles.beforeImageOpacity}
                                    >
                                        <Image source={require('../../assets/Images/imglogo.png')}
                                            style={styles.beforeImageStyle}
                                        >
                                        </Image>
                                    </TouchableOpacity>
                                )
                                :
                                (
                                    <View
                                        style={styles.afterImageView}>
                                        <ImageBackground source={{ uri: cnicBackImage }}
                                            style={styles.afterImageStyle} imageStyle={{ borderRadius: 10 }}>
                                            <TouchableOpacity onPress={() => {
                                                setModalVisible(true)
                                                setCheckFunction('cb')
                                            }}>
                                                <Feather name='edit' size={15} color='#AAB9C7'
                                                    style={styles.afterImageeditButton}></Feather>
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    </View>
                                )
                            }
                        </View>
                        <View style={styles.licenseFrontView}>
                            <Text style={styles.imageText}>
                                License Front
                            </Text>
                            {licenseFrontImage?.length == 0 ?
                                (
                                    <TouchableOpacity onPress={() => {
                                        setModalVisible(true)
                                        setCheckFunction('Lf')
                                    }}
                                        style={styles.beforeImageOpacity}
                                    >
                                        <Image source={require('../../assets/Images/imglogo.png')}
                                            style={styles.beforeImageStyle}
                                        >
                                        </Image>
                                    </TouchableOpacity>
                                )
                                :
                                (
                                    <View
                                        style={styles.afterImageView}>
                                        <ImageBackground source={{ uri: licenseFrontImage }}
                                            style={styles.afterImageStyle} imageStyle={{ borderRadius: 10 }}
                                        >
                                            <TouchableOpacity onPress={() => {
                                                setModalVisible(true)
                                                setCheckFunction('Lf')
                                            }}>
                                                <Feather name='edit' size={15} color='#AAB9C7'
                                                    style={styles.afterImageeditButton}></Feather>
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    </View>
                                )
                            }
                        </View>
                        <View style={styles.licenseBackView}>
                            <Text style={styles.imageText}>
                                License Back
                            </Text>
                            {licenseBackImage?.length == 0 ?
                                (
                                    <TouchableOpacity onPress={() => {
                                        setModalVisible(true)
                                        setCheckFunction('Lb')
                                    }
                                    }
                                        style={styles.beforeImageOpacity}
                                    >
                                        <Image source={require('../../assets/Images/imglogo.png')}
                                            style={styles.beforeImageStyle}
                                        >
                                        </Image>
                                    </TouchableOpacity>
                                )
                                :
                                (
                                    <View
                                        style={styles.afterImageView}>
                                        <ImageBackground source={{ uri: licenseBackImage }}
                                            style={styles.afterImageStyle} imageStyle={{ borderRadius: 10 }}
                                        >
                                            <TouchableOpacity onPress={() => {
                                                setModalVisible(true)
                                                setCheckFunction('Lb')
                                            }}>
                                                <Feather name='edit' size={15} color='#AAB9C7'
                                                    style={styles.afterImageeditButton}></Feather>
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    </View>
                                )
                            }
                        </View>
                        <View style={styles.licenseBackView}
                        >
                            <Text style={styles.imageText}>
                                Profile Picture
                            </Text>
                            {profileImage?.length == 0 ?
                                (
                                    <TouchableOpacity onPress={() => {
                                        setModalVisible(true)
                                        setCheckFunction('Profile')
                                    }
                                    }
                                        style={styles.beforeImageOpacity}>
                                        <Image source={require('../../assets/Images/imglogo.png')}
                                            style={styles.beforeImageStyle}>
                                        </Image>
                                    </TouchableOpacity>
                                )
                                :
                                (
                                    <View style={styles.afterImageView}>
                                        <ImageBackground source={{ uri: profileImage }}
                                            style={styles.afterImageStyle} imageStyle={{ borderRadius: 10 }}
                                        >
                                            <TouchableOpacity onPress={() => {
                                                setModalVisible(true)
                                                setCheckFunction('Profile')
                                            }}>
                                                <Feather name='edit' size={15} color='#AAB9C7'
                                                    style={styles.afterImageeditButton}></Feather>
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    </View>
                                )
                            }
                        </View>
                    </View>
                </View>

                <View style={{ height: Dimensions.get("screen").height * 0.20, }}>
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
                                    postVehicleDetails()
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
                            Create New Account |
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                            <Text style={styles.LoginTouch}>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};
export default UploadFiles;