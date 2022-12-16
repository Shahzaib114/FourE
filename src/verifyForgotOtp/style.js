
import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../utility/colors/Colors";
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollViewStyle: {
        backgroundColor: Colors.getLightColor('whiteColor'),
    },
    contentContainer: {
        justifyContent: 'center',
        flexGrow: 1
    },
    HeaderViewStyle: {
        backgroundColor: Colors.getLightColor('primaryColor'),
        width: '100%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: Dimensions.get('window').height * 0.18,
        justifyContent: 'center'
    },
    carImageView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationsText: {
        color: Colors.getLightColor('whiteColor'),
        fontFamily: 'Montserrat-Light',
        fontSize: 25,
        lineHeight: 13,
        paddingTop: '3%',
        margin: '2%'
    },
    notificationIcon: {
        backgroundColor: Colors.getLightColor('whiteColor'),
        borderRadius: 30,
        padding: '1%',
        color: Colors.getLightColor('primaryColor'),
        paddingHorizontal: '5%'
    },
    ImageView: {
        width: '100%',
        borderBottomLeftRadius: 15,
        height: Dimensions.get('window').height * 0.52,
        justifyContent: 'center',
    },
    imageStyle: {
        alignSelf: 'center',
        height: Dimensions.get('window').height * 0.42,
    },
    resendMainCOntainer: {
        width: '100%',
        borderBottomLeftRadius: 15,
        height: Dimensions.get('window').height * 0.30,
        justifyContent: 'center',
    },
    didntrecieveOTPscndView: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    },
    TextInputField: {
        marginLeft: '5%',
        marginVertical: '1%',
        borderRadius: 15,
        width: '90%',
    },
    errorText: {
        width: '80%',
        marginHorizontal: '10%',
        fontFamily: 'Montserrat-Italic',
        fontSize: 12,
        color: Colors.getLightColor('mustardColor')
    },
    FourDigitTetx: {
        width: '90%',
        alignSelf: 'center',
        textAlign: 'center',
        color: Colors.getLightColor('primaryColor'),
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 24,
        fontFamily: 'Montserrat-Medium',
    },
    RetryText: {
        alignSelf: 'center',
        textAlign: 'center',
        color: Colors.getLightColor('blackColor'),
        fontSize: 15,
        fontFamily: 'Montserrat-Medium',
    },
    iconsandInputView: {
        width: '100%',
        flexDirection: 'row'
    },
    inputIconStyle: {
        alignSelf: 'center',
        marginRight: '3%',
        marginLeft: '3%'
    },
    PlaceholderStyling: {
        width: '85%',
        fontSize: 14,
        color: Colors.getLightColor('blackColor'),
        alignSelf: 'center',
    },
    touchableView: {
        width: '90%',
        backgroundColor: Colors.getLightColor('primaryColor'),
        margin: '5%',
        borderRadius: 5,
        alignContent: 'center',
        alignItems: 'center',
        paddingVertical: '5%',
    },
    emailtext: {
        color: Colors.getLightColor('whiteColor'),
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
    },
})
export default styles;