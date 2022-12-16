import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    Text, View,
    Modal,
    TouchableOpacity, Image
} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from "../../utility/colors/Colors";
import styles from "./style";
const NetworkCheck = (props) => {
    const navigation = useNavigation()
    return (
        <Modal
            animationIn={'fadeIn'}
            animationInTiming={800}
            visible={true}
            transparent={true}
            // style={{backgroundColor:'black'}}
        >
            <View style={styles.container}>
                <View>
                    <Image source={require('../../assets/Images/FourELogo.png')}>
                    </Image>
                </View>
                <View style={{ width: '90%' }}>
                    <View style={styles.parentView}>
                        <AntDesign name="disconnect" size={80} color={Colors.getLightColor('primaryColor')}>
                        </AntDesign>
                        <Text style={styles.noInternetText}>
                            No Internet
                        </Text>
                    </View>
                    <View style={styles.secondMainView}>
                        <Text style={styles.turnOnWifiText}>
                            Please Turn On Your Wifi or Check Your Mobile Data !
                        </Text>
                        <TouchableOpacity style={styles.okOpacity}
                            onPress={() => { navigation.goBack() }} >
                            <Text style={styles.okText}>
                                Ok
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
export default NetworkCheck;

