import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../../utility/colors/Colors";
const styles = StyleSheet.create({
    scrollViewStyle: {
        backgroundColor: Colors.getLightColor('whiteColor'),
        flex: 1
    },
    contentContainer: {
        justifyContent: 'center',
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
        borderRadius: 40,
        padding: '3%',
        color: Colors.getLightColor('primaryColor'),
        alignSelf: 'center'
    },
    resetPasswordContainer: {
        width: '100%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: Dimensions.get('window').height * 0.48,
        justifyContent: 'center'
    },
    loginText: {
        fontSize: 35,
        lineHeight: 43,
        fontWeight: '600',
        marginLeft: '6%',
        margin: '5%',
        color: Colors.getLightColor('blackColor'),
        fontFamily: 'Montserrat-Medium',
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
    iconsandInputView: {
        width: '95%',
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