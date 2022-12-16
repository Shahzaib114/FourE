import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../utility/colors/Colors";
const styles = StyleSheet.create({
    header: {
        flex: 1, backgroundColor: 'silver'
    },
    modalView: {
        backgroundColor: Colors.getLightColor('primaryColor'), borderRadius:10,
        justifyContent:'center',alignItems:'center'
    },
    driverProfileView: {
        backgroundColor:'red',
        alignItems: 'center', 
    },
    imageStyle: {
        borderRadius: 50,marginVertical:'2%',
        height:Dimensions.get('window').height*0.095, width:Dimensions.get('window').width*0.2,
    },
    TriptextView: {
        justifyContent: 'center', alignItems: 'center',
    },
    horizontalline: {
        height: 2, backgroundColor: Colors.getLightColor('primaryColor'),
        marginHorizontal: '3%',
    },
    ratingView: {
        justifyContent: 'center', alignItems: 'center', 
    },
    ratingStyle: {
        alignSelf: 'center', padding: '3%',
    },
    reviewView: {
        justifyContent: 'center', alignItems: 'center',alignSelf:'center',
        backgroundColor: Colors.getLightColor('secondaryColor'), borderRadius: 10,
        margin:'5%'
    },

})
export default styles;