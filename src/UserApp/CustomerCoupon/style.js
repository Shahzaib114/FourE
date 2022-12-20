import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../utility/colors/Colors";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.getLightColor('whiteColor'),
    },
    HeaderViewStyle: {
        backgroundColor: Colors.getLightColor('primaryColor'),
        width: '100%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: Dimensions.get('window').height * 0.22,
    },
    seconMainView: {
        height: Dimensions.get('window').height * 0.20,
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center',
        padding: '2%'
    },
    applyCouponView: {
        width: '95%',
        justifyContent: 'space-around',
        backgroundColor: '#EEF3F9',
        alignItems: 'center',
        borderRadius: 5,
        height: '95%'
    },
    couponInput: {
        width: '90%',
        backgroundColor: Colors.getLightColor('whiteColor'),
        padding: '3%',
        marginHorizontal: '5%',
        borderRadius: 5,
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        color: Colors.getLightColor('blackColor')
    },
    applyCouponText: {
        padding: '3%',
        fontSize: 15,
        fontFamily: 'Montserrat-Medium',
        color: Colors.getLightColor('whiteColor')
    },
    flatListMainView: {
        backgroundColor: '#EEF3F9',
        borderRadius: 5,
        marginVertical: '1%',
        padding: '1%'
    },
    saleText: {
        margin: '2%',
        fontFamily: 'Montserrat-Medium',
        color: Colors.getLightColor('secondaryColor'),
        fontSize: 16
    },
    couponCodeText: {
        textAlign: 'justify',
        color: Colors.getLightColor('primaryColor'),
        margin: '2%',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14
    },
    validityText: {
        alignSelf: 'flex-end',
        margin: '2%',
        color: Colors.getLightColor('primaryColor'),
        fontFamily: 'Montserrat-Medium',
        fontSize: 14
    },
    netContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: Colors.getLightColor('primaryColor')
    },
    netParentView: {
        backgroundColor: Colors.getLightColor('secondaryColor'),
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%',
        justifyContent: 'space-evenly',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        paddingVertical: '10%'
    },
    netNoInternetText: {
        color: Colors.getLightColor('primaryColor'),
        fontSize: 25,
        fontFamily: 'Montserrat-Medium',
    },
    netSecondMainView: {
        backgroundColor: 'white',
        alignSelf: 'center',
        width: '100%',
        paddingVertical: '5%',
        alignContent: 'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    netTurnOnWifiText: {
        color: Colors.getLightColor('primaryColor'),
        fontSize: 20,
        fontFamily: 'Montserrat-Medium',
        textAlign: 'center'
    },
    netOkOpacity: {
        width: '80%',
        backgroundColor: Colors.getLightColor('secondaryColor'),
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        // padding:'3%',
        marginVertical: '5%'
    },
    netOkText: {
        color: Colors.getLightColor('primaryColor'),
        fontSize: 25,
        fontFamily: 'Montserrat-Medium',
    },
});
export default styles;