import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../utility/colors/Colors";
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollViewStyle: {
        backgroundColor: Colors.getLightColor('primaryColor'),
    },
    contentContainer: {
        flexGrow: 1
    },
    createtext: {
        fontSize: 35,
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium',
        alignSelf: 'center'
    },
    HeaderView: {
        width: '100%',
        // height: Dimensions.get('window').height * 0.20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextInputSection: {
        marginTop: '1%',
        // height: Dimensions.get('window').height * 0.55,
        marginVertical: '2%',
    },
    iconsandInputView: {
        width: '100%',
        flexDirection: 'row',
    },
    TextInputField: {
        borderRadius: 15,
        width: '95%',
        marginHorizontal: '2.5%',
        marginVertical: '0.5%',
        justifyContent: 'space-around'
    },
    PlaceholderStyling: {
        width: '80%',
        fontSize: 14,
        color: Colors.getLightColor('whiteColor'),
        alignSelf: 'center',
        flexDirection: 'row'
    },
    errorText: {
        width: '80%',
        marginHorizontal: '10%',
        fontFamily: 'Montserrat-Italic',
        fontSize: 12,
        color: Colors.getLightColor('mustardColor')
    },
    inputIconStyle: {
        alignSelf: 'center',
        marginHorizontal: '3%'
    },
    BottomLineView: {
        flexDirection: 'row',
        marginTop: '3%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    creatAccount: {
        color: Colors.getLightColor('whiteColor'),
    },
    continueOpacity: {
        width: '90%',
        marginHorizontal: '5%',
        backgroundColor: Colors.getLightColor('secondaryColor'),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '4%',
        borderRadius: 5,
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
    contnueText: {
        color: Colors.getLightColor('whiteColor'),
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '500',
        fontFamily: 'Montserrat-Medium',
    },
    LoginTouch: {
        marginLeft: 5,
        color: Colors.getLightColor('secondaryColor'),
        fontFamily: 'Montserrat-Medium',
    },
    privacyText: {
        lineHeight: 28,
        color: Colors.getLightColor('whiteColor'),
        fontFamily: 'Montserrat-Medium',
    },
    termsConditionText: {
        color: Colors.getLightColor('whiteColor'),
        fontFamily: 'Montserrat-Medium',
    },
    policyText: {
        color: Colors.getLightColor('secondaryColor'),
        fontFamily: 'Montserrat-Medium',
        width: '95%',
        marginLeft: '5%'
    },
    bottomCarView: {
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: '5%',
    },
    bottomCarStyle: {
        width: '100%',
        height: Dimensions.get('window').height * 0.14,
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
})
export default styles;