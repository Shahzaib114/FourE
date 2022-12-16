import { useNavigation } from "@react-navigation/native";
import { style } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import React, { useRef, useState, useEffect } from "react";
import {
    AppState, StyleSheet, Text, View,
    NativeModules,
    Modal,
    TouchableOpacity,
    Linking,
    PermissionsAndroid, Image, Dimensions
} from "react-native";
import Geolocation from 'react-native-geolocation-service';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from "../utility/colors/Colors";
import NetworkCheck from "./NetworkError";


const Locations = ({route}) => {
    const navigation = useNavigation()
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            console.log('Refreshed in history!');
            setVisibility(false)
        })
        return unsubscribe;
    }, [navigation]);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('Refreshed in history!', visibility);
        })
        return unsubscribe;
    }, [navigation]);
    // useEffect(() => {
    //     Geolocation.getCurrentPosition(info => console.log('location are', info));
    // }, [])

    const [visibility, setVisibility] = useState(false);

    return (
        <View>
            {visibility && (
            <NetworkCheck modalVisible={true}></NetworkCheck>
            )}
            {/* <Modal
                animationIn={'fadeIn'}
                animationInTiming={800}
                visible={modalVisible}
            >
                <View style={{ justifyContent: 'center', backgroundColor: 'black', height: '100%', width: '100%' }}>

                    <View style={{
                        backgroundColor: Colors.getLightColor('secondaryColor'), height: '25%', alignItems: 'center', alignSelf: 'center',
                        width: '90%', justifyContent: 'space-evenly', borderTopRightRadius: 5, borderTopLeftRadius: 5
                    }}>
                        <AntDesign name="disconnect" size={80} color={Colors.getLightColor('primaryColor')}>
                        </AntDesign>
                        <Text style={{
                            color: Colors.getLightColor('primaryColor'),
                            fontSize: 25,
                            fontFamily: 'Montserrat-Medium',
                        }}>
                            No Internet
                        </Text>
                    </View>
                    <View style={{
                        backgroundColor: 'white', height: '20%', alignSelf: 'center', width: '90%',
                        alignContent: 'center', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, justifyContent: 'space-around', alignItems: 'center'
                    }}>
                        <Text style={{
                            color: Colors.getLightColor('primaryColor'),
                            fontSize: 20,
                            fontFamily: 'Montserrat-Medium',
                            textAlign: 'center'
                        }}>
                            Please Turn On Your Wifi or Check Your Mobile Data !
                        </Text>
                        <TouchableOpacity style={{
                            width: '80%', backgroundColor: Colors.getLightColor('secondaryColor'), borderRadius: 25,
                            justifyContent: 'center', alignItems: 'center'
                        }}
                            onPress={() => setModalVisible(false)}>
                            <Text style={{
                                color: Colors.getLightColor('primaryColor'),
                                fontSize: 25,
                                fontFamily: 'Montserrat-Medium',
                            }}>
                                Ok
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal> */}
            
            <TouchableOpacity onPress={() => setVisibility(true)}>
                <Text style={{ color: 'black' }}>
                    cjkec
                </Text>
            </TouchableOpacity>
        </View>
    )
}
export default Locations