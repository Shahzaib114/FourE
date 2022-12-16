import { style } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import React, { useRef, useState, useEffect } from "react";
import {
  AppState, StyleSheet, Text, View,
  NativeModules,
  Modal,
  TouchableOpacity,
  Linking,
  PermissionsAndroid
} from "react-native";
import Geolocation from 'react-native-geolocation-service';
import AntDesign from 'react-native-vector-icons/AntDesign';


const Locations = () => {
useEffect(()=>{
    Geolocation.getCurrentPosition(info => console.log('location are', info));
},[])
const [modalVisible, setModalVisible] = useState(false);

return(
    <View>
        <Modal
            animationIn={'fadeIn'}
            animationInTiming={800}
            visible={modalVisible}
            // style={{ margin: 0, justifyContent:'center', alignItems:'center' }}
            // mo
        >
            <View style={{justifyContent:'center', backgroundColor:'black', height:'100%', width:'100%'}}>
            <View style={{backgroundColor:'grey', height:'50%', alignSelf:'center', width:'90%', alignContent:'center'}}>
                <AntDesign name='warning' color='black' size={60}>
                </AntDesign>
                <TouchableOpacity onPress={()=> setModalVisible(false)}>
                <Text >
                    Your Profile is under Approval Process !{'\n'} Do You want to Update Details ?
                </Text>

                </TouchableOpacity>

            </View>
            </View>
            
        </Modal>
        <TouchableOpacity onPress={()=> setModalVisible(true)}>
        <Text style={{ color: 'black' }}>
            cjkec
        </Text>

        </TouchableOpacity>
    </View>
)
}
export default Locations