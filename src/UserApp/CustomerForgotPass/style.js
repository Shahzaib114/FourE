
import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../../utility/colors/Colors";
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollViewStyle: {
        backgroundColor: Colors.getLightColor('whiteColor'),
        flexGrow: 1
    },
    HeaderViewStyle: {
        backgroundColor: Colors.getLightColor('primaryColor'),
        width: '100%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: Dimensions.get('window').height * 0.22,
        justifyContent: 'center'
    },
    carImageView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationsText: {
        color: Colors.getLightColor('whiteColor'),
        fontFamily: 'Montserrat-Light',
        fontSize: 20,
        lineHeight: 13,
        paddingTop: '3%',
        margin: '2%'
    },
    notificationIcon: {
        backgroundColor: Colors.getLightColor('whiteColor'),
        borderRadius: 30,
        padding: '2%',
        color: Colors.getLightColor('primaryColor'),
        fontSize: 30,
        paddingHorizontal: '5%'
    },
    contentContainer: {
        justifyContent: 'center',
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