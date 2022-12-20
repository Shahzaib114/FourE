import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../utility/colors/Colors";
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalHeaderView: {
        backgroundColor: Colors.getLightColor('whiteColor'),
        justifyContent: 'space-between',
        width: '90%',
        height: '40%',
        margin: '5%',
        borderRadius: 10,
        alignItems: 'center'
    },
    warningIcon: {
        margin: '5%',
        color: Colors.getLightColor('primaryColor')
    },
    warningText: {
        textAlign: 'center',
        alignItems: 'center',
        lineHeight: 20,
        fontFamily: 'Montserrat-Medium',
        fontSize: 15,
        color: Colors.getLightColor('primaryColor')
    },
    touchableOptionView: {
        width: '95%',
        marginHorizontal: '2.5%',
        padding: '2%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    changeProfileDetails: {
        backgroundColor: Colors.getLightColor('secondaryColor'),
        width: '46%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 5
    },
    changeProfileDetailsText: {
        padding: '8%',
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        textAlign: 'center',
        color: Colors.getLightColor('primaryColor')
    },
    changeVehicleDetails: {
        backgroundColor: Colors.getLightColor('secondaryColor'),
        width: '46%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 5,
        textAlign: 'center',
        alignItems: 'center'
    },
    changeVehicleDetailsText: {
        color: Colors.getLightColor('primaryColor'),
        padding: '8%',
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        textAlign: 'center'
    },
    skipTextOpacity: {
        backgroundColor: 'red',
        alignSelf: 'flex-end',
        width: '95%',
        margin: '2.5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    skipText: {
        padding: '4%',
        textAlign: 'center',
        fontFamily: 'Montserrat-Medium',
        fontSize: 15,
        color: Colors.getLightColor('whiteColor')
    },
    scrollViewStyle: {
        backgroundColor: Colors.getLightColor('primaryColor')
    },
    contentContainer: {
        alignItems: 'center',
        // flexGrow: 1
        flexGrow: 1,
        justifyContent:'space-around'
    },
    firstView: {
        // height: Dimensions.get('window').height * 0.35,
        width: '90%',
        justifyContent: 'space-around',
    },
    welcomeLogin: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    TextInputSection: {
        marginTop: '1%',
        // height: Dimensions.get('window').height * 0.28,
        width: '90%',
        marginHorizontal: '5%',
    },
    welcomeText: {
        fontSize: 35,
        color: Colors.getLightColor('whiteColor'),
        fontFamily: 'Montserrat-Medium',
    },
    loginText: {
        fontSize: 30,
        color: Colors.getLightColor('whiteColor'),
        fontFamily: 'Montserrat-Light',
        marginTop: '2%'
    },
    TextInputHeaderText: {
        fontSize: 16,
        color: Colors.getLightColor('secondaryColor'),
        fontFamily: 'Montserrat-Light',
    },
    TextInputField: {
        marginVertical: '1%',
        borderRadius: 15,
        width: '100%',
    },
    iconsandInputView: {
        width: '100%',
        flexDirection: 'row',
        marginLeft: '2%'
    },
    errorText: {
        width: '90%',
        marginHorizontal: '5%',
        fontFamily: 'Montserrat-Italic',
        fontSize: 12,
        color: Colors.getLightColor('mustardColor')
    },
    forgotView: {
        flexDirection: 'row',
        width: '95%',
        justifyContent: 'space-between',
    },
    PlaceholderStyling: {
        width: '85%',
        fontSize: 14,
        color: Colors.getLightColor('whiteColor'),
        alignSelf: 'center',
    },
    inputIconStyle: {
        alignSelf: 'center',
        marginRight: '3%',
        marginLeft: '3%'
    },
    touchableView: {
        width: '70%',
        backgroundColor: Colors.getLightColor('secondaryColor'),
        marginHorizontal: '15%',
        borderRadius: 50,
        alignContent: 'center',
        alignItems: 'center',
        paddingVertical: '3%',
    },
    loginButtonView: {
        // height: Dimensions.get('window').height * 0.16,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around'
    },
    indicatorView: {
        width: '70%',
        marginHorizontal: '15%',
        borderRadius: 50,
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
        paddingVertical: '2%',
    },
    emailtext: {
        color: Colors.getLightColor('whiteColor'),
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
    },
    imageViewBottom: {
        // height: Dimensions.get('window').height * 0.20,
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'flex-end',
    },
    bottomImageStyle: {
        width: Dimensions.get('window').width * 1,
        height: Dimensions.get('window').height * 0.15,
        marginTop: '1%'
    },
    lineView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '95%',
        margin: '2.5%',
        justifyContent: 'center',
    },
    forgotPassOpacity: {
        flexDirection: 'row'
    },
    forgottext: {
        color: Colors.getLightColor('whiteColor'),
        fontFamily: 'Montserrat-Medium',
    },
    BottomLineView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        marginVertical:'3%'
    },
    creatAccount: {
        color: Colors.getLightColor('whiteColor'),
        fontFamily: 'Montserrat-Medium',
    },
    LoginTouch: {
        marginLeft: 5,
        color: Colors.getLightColor('whiteColor'),
        fontFamily: 'Montserrat-Medium',
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