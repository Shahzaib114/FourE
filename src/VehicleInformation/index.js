import { View, FlatList, Dimensions, Text, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator, PermissionsAndroid, Alert } from 'react-native'
import React, { useState, useEffect, } from 'react';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomBackArrow from '../CustomBackArrow';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServiceTypes } from '../../store/Actions/ServiceTypes/ServiceTypes';
import Colors from '../../utility/colors/Colors';
import NetInfo from "@react-native-community/netinfo";
const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.name}</Text>
    </TouchableOpacity>
)
const VehicleInfo = ({ navigation, route }) => {
    const [displayView, setDisplayView] = useState(true);
    const [interiorImages, setInteriorImages] = useState([]);
    const [exteriorImages, setExteriorImages] = useState([]);
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehicleMake, setVehicleMake] = useState('');
    const [taxNumber, setTaxNumber] = useState('');
    const [vehicleNumberError, setVehicleNumberError] = useState('');
    const [vehicleModelError, setVehicleModelError] = useState('');
    const [vehicleColorError, setVehicleColorError] = useState('');
    const [vehicleMakeError, setVehicleMakeError] = useState('');
    const [taxNumberError, setTaxNumberError] = useState('');
    const [gallertPermissions, setGalleryPermissions] = useState();
    const [ServiceTypes, setServiceTypes] = useState();
    const [selectedId, setSelectedId] = useState(null);
    const [serviceName, SetServiceName] = useState('');
    const loading = useSelector((state) => state.serviceTypes.runLoader)
    const data = useSelector((state) => state.serviceTypes.data)
    const error = useSelector((state) => state.serviceTypes.error)
    const dispatch = useDispatch();

    useEffect(() => {
        getPermissions()
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
                dispatch(fetchServiceTypes())
            }
        })
    }, []);


    useEffect(() => {
        setDisplayView(loading)
        if (!loading && data != null) {
            setServiceTypes(data)
        }
        else if (!loading && error != null) {
            alert('Credentials are Wrong')
        }
    }, [loading])

    const getPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setGalleryPermissions(true)
            } else {
                setGalleryPermissions(false)
            }
        } catch (err) {
            console.warn(err);
        }
    }

    const renderItem = ({ item }) => {
        const backgroundColor = item.type_id === selectedId ? Colors.getLightColor('secondaryColor') : Colors.getLightColor('whiteColor');
        const color = item.type_id === selectedId ? 'white' : 'black';
        return (
            <View>
                <Item
                    item={item}
                    onPress={() => {
                        setSelectedId(item.type_id)
                        SetServiceName(item.name)
                    }
                    }
                    backgroundColor={{ backgroundColor }}
                    textColor={{ color }}
                />
            </View>
        );
    }

    const validate = () => {
        if (selectedId == null) {
            alert('Please Select Ride Type!')
        }
        else if ((vehicleNumber == '') || (vehicleNumberError != '')) {
            setVehicleNumberError('Please Add Number!')
        }
        else if ((vehicleModel == '') || (vehicleModelError != '')) {
            setVehicleModelError('Please Add Model!')
        }
        else if ((vehicleColor == '') || (vehicleColorError != '')) {
            setVehicleColorError('Please Add Color!')
        }
        else if ((vehicleMake == '') || (vehicleMakeError != '')) {
            setVehicleMakeError('Please input Make!')
        }
        else if ((taxNumber == '') || (taxNumberError != '')) {
            setTaxNumberError('Please Add Tax Number!')
        }
        else if (interiorImages.length === 0) {
            alert('Please Add Vehicle Interior Images!')
        }
        else if (exteriorImages.length === 0) {
            alert('Please Add Vehicle Interior Images!')
        }
        else {
            navigation.navigate('UploadFiles',
                {
                    paramServiceType: selectedId,
                    paramNumber: vehicleNumber,
                    paramModel: vehicleModel,
                    paramColor: vehicleColor,
                    paramMake: vehicleMake,
                    paramTokenTax: taxNumber,
                    paramInreriorImages: interiorImages,
                    paramExteriorImages: exteriorImages,
                    paramSkip: route.params.paramSkip,
                    paramSkipId: route.params.paramSkipId,
                },
            )
        }



        // console.log('inside validation')
        // if ((selectedId == null) || (vehicleNumber == '') || (vehicleModel == '') || (vehicleColor == '') || (vehicleMake == '') || (taxNumber == '') || (interiorImages.length == 0) || (exteriorImages.length == 0)) {
        //     alert('Please fill all field!')
        //     // setErrorDate('Date is Empty');
        // }
        // else if ((vehicleNumberError != '') && (vehicleModelError != '') && (vehicleColorError != '') && (taxNumberError != '')) {

        //     alert('Please fill Correct Data!')
        // }
        // else {
        //     // console.log('correct data')
        //     navigation.navigate('UploadFiles',
        //         {
        //             paramServiceType: selectedId,
        //             paramNumber: vehicleNumber,
        //             paramModel: vehicleModel,
        //             paramColor: vehicleColor,
        //             paramMake: vehicleMake,
        //             paramTokenTax: taxNumber,
        //             paramInreriorImages: interiorImages,
        //             paramExteriorImages: exteriorImages,
        //             paramSkip: route.params.paramSkip,
        //             paramSkipId: route.params.paramSkipId,
        //         },
        //     )
        // }
    }
    const openEnteriorImagePicker = () => {
        if (gallertPermissions === true) {
            ImagePicker.openPicker({
                multiple: true
            }).then(images => {
                setInteriorImages(images)
            }).catch((callBack) => {
                console.log(callBack);
            });
        }
        else {
            alert('please Allow Gallery Permissions First!')
            getPermissions();
        }

    }
    const openExteriorImagePicker = () => {
        if (gallertPermissions === true) {
            ImagePicker.openPicker({
                multiple: true
            }).then(images => {
                setExteriorImages(images)
            }).catch((callBack) => {
                console.log(callBack);
            });
        }
        else {
            alert('please Allow Gallery Permissions First!')
            getPermissions();
        }

    }

    return (
        <View style={styles.container}>
            {!displayView ?
                (
                    <ScrollView style={styles.scrollViewStyle}
                        contentContainerStyle={styles.contentContainer}>
                        <View style={{ height: Dimensions.get('window').height * 0.19, justifyContent: 'space-around' }}>
                            <CustomBackArrow />
                            <Text style={styles.vehicleInfoText}>
                                Enter Vehicle's {'\n'}Information
                            </Text>
                        </View>
                        <View style={styles.TextInputSection}>
                            <View style={{ width: '90%', marginHorizontal: '5%', height: Dimensions.get('window').height * 0.07, }}>
                                <FlatList
                                    keyExtractor={(item, index) => {
                                        return index.toString();
                                    }}
                                    data={ServiceTypes}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={renderItem}
                                    extraData={selectedId}
                                />
                            </View>
                            {/* {serviceName == '' ?
                                (
                                    <View style={{ width: '90%', marginHorizontal: '5%', height: Dimensions.get('window').height * 0.07, }}>
                                        <FlatList
                                            // keyExtractor={(item, index) => {
                                            //     return item.id;
                                            //   }}
                                            keyExtractor={(item, index) => {
                                                return index.toString();
                                                // console.log(item)
                                            }}

                                            data={ServiceTypes}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={renderItem}
                                            extraData={selectedId}
                                        />
                                    </View>
                                )
                                :
                                (
                                    <View style={{
                                        flexDirection: 'row', width: '90%', backgroundColor: Colors.getLightColor('silverColor'), marginHorizontal: '5%',
                                        height: Dimensions.get('window').height * 0.08, justifyContent: 'center', alignItems: 'center',
                                        borderRadius: 10
                                    }}>
                                        <Text style={{
                                            color: Colors.getLightColor('whiteColor'),
                                            fontFamily: 'Montserrat-Medium', fontSize: 18, backgroundColor: Colors.getLightColor('primaryColor'), paddingVertical: '4%', margin: '2%', padding: '2%',
                                            borderRadius: 5
                                        }}>
                                            {serviceName}
                                        </Text>
                                        <FlatList
                                            // keyExtractor={(item, index) => {
                                            //     return item.id;
                                            //   }}
                                            keyExtractor={(item, index) => {
                                                return index.toString();
                                                // console.log(item)
                                            }}

                                            data={ServiceTypes}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={renderItem}
                                            extraData={selectedId}
                                        />
                                    </View>
                                )
                            } */}
                            <View style={styles.vehicleNumberMainView}>
                                <View style={styles.vehicleNumberscndMainView}>
                                    <View style={{ width: '47.5%', }}>
                                        <View style={styles.userNameView}>
                                            <MaterialCommunityIcons name='card-bulleted'
                                                size={20} color={Colors.getLightColor('whiteColor')}
                                                style={styles.inputIconStyle}>
                                            </MaterialCommunityIcons>
                                            <TextInput
                                                placeholder='Vehicle Number'
                                                placeholderTextColor='#AAB9C7'
                                                underlineColorAndroid={"#E4EDF5"}
                                                onChangeText={txt => {
                                                    if (txt.length > 0) {
                                                        setVehicleNumberError('')
                                                    }
                                                    else if (txt == '') {
                                                        setVehicleNumberError('Please Input Number')
                                                    }
                                                    setVehicleNumber(txt);
                                                }}
                                                style={styles.vehicleNumberInput}
                                            >
                                            </TextInput>
                                        </View>
                                        <Text style={styles.errorText}>
                                            {vehicleNumberError}
                                        </Text>
                                    </View>
                                    <View style={{ width: '47.5%', marginLeft: '5%' }}>
                                        <View style={styles.userNameView}>
                                            <Ionicons name='md-car-sport' size={20} color={Colors.getLightColor('whiteColor')} style={styles.inputIconStyle}>
                                            </Ionicons>
                                            <TextInput
                                                placeholder="Vehicle's Model(20XX)"
                                                placeholderTextColor='#AAB9C7'
                                                keyboardType='decimal-pad'
                                                underlineColorAndroid={"#E4EDF5"}
                                                onChangeText={txt => {
                                                    if (txt.length > 0) {
                                                        setVehicleModelError('')
                                                    }
                                                    else if (txt == '') {
                                                        setVehicleModelError('Please Input Model')
                                                    }
                                                    setVehicleModel(txt)
                                                }}
                                                style={styles.vehicleModelInput}
                                            >
                                            </TextInput>
                                        </View>
                                        <Text style={styles.errorText}>
                                            {vehicleModelError}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.vehicleColorMainView}>
                                    <View style={{ width: '47.5%', }}>
                                        <View style={styles.userNameView}>
                                            <MaterialCommunityIcons name='spray' size={24} color={Colors.getLightColor('whiteColor')}
                                                style={{ transform: [{ rotateY: '180deg' }], alignSelf: 'center', marginRight: '3%', }}>
                                            </MaterialCommunityIcons>
                                            <TextInput
                                                placeholder="Vehicle's Color"
                                                placeholderTextColor='#AAB9C7'
                                                underlineColorAndroid={"#E4EDF5"}
                                                onChangeText={txt => {
                                                    if (txt.length > 0) {
                                                        setVehicleColorError('')
                                                    }
                                                    else if (txt == '') {
                                                        setVehicleColorError('Please Input Model')
                                                    }
                                                    setVehicleColor(txt);
                                                }}
                                                style={styles.vehicleNumberInput}
                                            >
                                            </TextInput>
                                        </View>
                                        <Text style={styles.errorText}>
                                            {vehicleColorError}
                                        </Text>
                                    </View>
                                    <View style={{ width: '47.5%', marginLeft: '5%' }}>
                                        <View style={styles.userNameView}>
                                            <Octicons name='organization' size={20} color={Colors.getLightColor('whiteColor')} style={styles.inputIconStyle}>
                                            </Octicons>
                                            <TextInput
                                                placeholder="Vehicle's Make(Suzuki)"
                                                placeholderTextColor='#AAB9C7'
                                                underlineColorAndroid={"#E4EDF5"}
                                                keyboardType='default'
                                                onChangeText={txt => {
                                                    if (txt.length > 0) {
                                                        setVehicleMakeError('')
                                                    }
                                                    else if (txt == '') {
                                                        setVehicleMakeError('Please Input Model')
                                                    }
                                                    setVehicleMake(txt);
                                                }}
                                                style={styles.vehicleModelInput}
                                            >
                                            </TextInput>
                                        </View>
                                        <Text style={styles.errorText}>
                                            {vehicleMakeError}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.TextInputField}>
                                    <Ionicons name='md-car-sport' size={20} color={Colors.getLightColor('whiteColor')} style={styles.inputIconStyle}>
                                    </Ionicons>
                                    <TextInput
                                        placeholder="Token tax Number"
                                        placeholderTextColor='#AAB9C7'
                                        keyboardType='decimal-pad'
                                        underlineColorAndroid={"#E4EDF5"}
                                        style={styles.PlaceholderStyling}
                                        onChangeText={txt => {
                                            if (txt.length > 0) {
                                                setTaxNumberError('')
                                            }
                                            else if (txt == '') {
                                                setTaxNumberError('Please Input Model')
                                            }
                                            setTaxNumber(txt);
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.carPicturesContainer}>
                            <Text style={styles.carPicturesText}>
                                Upload Car Pictures
                            </Text>
                            <View style={{ height: '42%' }}>
                                <Text style={styles.interiorExtreiorText}>
                                    Vehicle Interior Pictures
                                </Text>
                                {interiorImages.length == 0 ?
                                    (
                                        <TouchableOpacity style={styles.addImagesOpacity}
                                            onPress={() => openEnteriorImagePicker()}
                                        >
                                            <AntDesign name='plus' size={20} color={Colors.getLightColor('blackColor')}>
                                            </AntDesign>
                                            <Text
                                                style={styles.addImageText}
                                            >
                                                Add Images
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                    :
                                    (
                                        <View>
                                            <FlatList
                                                keyExtractor={(item, index) => {
                                                    return index.toString();
                                                }}
                                                data={interiorImages}
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                renderItem={({ item }) => (
                                                    <View>
                                                        <Image source={{ uri: item.path }}
                                                            style={styles.interiorImages}
                                                        >
                                                        </Image>
                                                    </View>
                                                )}
                                            />
                                            <TouchableOpacity onPress={() => openEnteriorImagePicker()}
                                                style={styles.uploadAgainView}>
                                                <Text style={styles.uploadagainText}>
                                                    Tap to upload again
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            </View>
                            <View style={{ height: '42%' }}>
                                <Text style={styles.interiorExtreiorText}>
                                    Vehicle Exterior Pictures
                                </Text>
                                {exteriorImages.length == 0 ?
                                    (
                                        <TouchableOpacity style={styles.addImagesOpacity}
                                            onPress={() => openExteriorImagePicker()}>
                                            <AntDesign name='plus' size={20} color={Colors.getLightColor('blackColor')}>
                                            </AntDesign>
                                            <Text
                                                style={styles.addImageText}
                                            >
                                                Add Images
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                    :
                                    (
                                        <View>
                                            <FlatList
                                                keyExtractor={(item, index) => {
                                                    return index.toString();
                                                }}
                                                data={exteriorImages}
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                renderItem={({ item }) => (
                                                    <View>
                                                        <Image source={{ uri: item.path }}
                                                            style={styles.interiorImages}
                                                        >
                                                        </Image>
                                                    </View>
                                                )}
                                            />
                                            <TouchableOpacity onPress={() => openExteriorImagePicker()}
                                                style={styles.uploadAgainView}>
                                                <Text style={styles.uploadagainText}>
                                                    Tap to upload again
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                        <View style={{ height: Dimensions.get("screen").height * 0.10, justifyContent: 'space-around', }}>
                            <TouchableOpacity onPress={() =>
                                validate()
                            }
                                style={styles.continueOpacity}>
                                <Text style={styles.contnueText}>
                                    Continue
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.BottomLineView}>
                                <Text style={styles.creatAccount}>
                                    Already member |
                                </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('LogIn')}
                                >
                                    <Text style={styles.LoginTouch}>
                                        Login
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                )
                :
                (
                    <View style={{ alignSelf: 'center', justifyContent: 'center', flex: 1 }}>
                        <ActivityIndicator size={'large'} color='black'></ActivityIndicator>
                    </View>
                )
            }

        </View>
    )
}
export default VehicleInfo;