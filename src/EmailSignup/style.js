import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../utility/colors/Colors";
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollViewStyle: {
        backgroundColor: Colors.getLightColor('primaryColor'),
    },
    contentContainer: {
        flexGrow: 1, justifyContent:'space-around',
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
        // height: Dimensions.get('window').height * 0.26,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%'
    },
    TextInputSection: {
        // marginTop: '1%',
        // height: Dimensions.get('window').height * 0.40,
        // marginVertical: '2%'
    },
    iconsandInputView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    TextInputField: {
        marginLeft: '5%',
        marginHorizontal: '2%',
        borderRadius: 15,
        width: '90%',
        marginVertical: '0.5%',
    },
    PlaceholderStyling: {
        width: '80%',
        fontSize: 14,
        color: Colors.getLightColor('whiteColor'),
        alignSelf: 'center',
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
        marginRight: '3%',
        marginLeft: '3%',
    },
    selectedDateOpacity: {
        backgroundColor: Colors.getLightColor('secondaryColor'),
        borderRadius: 2,
    },
    licenseExpiryOpacity: {
        backgroundColor: Colors.getLightColor('secondaryColor'),
        borderRadius: 2,
    },
    licenseExpiryText: {
        paddingVertical: '3%',
        marginBottom: '1%',
        color: Colors.getLightColor('whiteColor'),
        paddingHorizontal: '10%'
    },
    selectedDateText: {
        paddingVertical: '3%',
        marginBottom: '1%',
        paddingHorizontal: '10%',
        color: Colors.getLightColor('whiteColor')
    },
    BottomLineView: {
        flexDirection: 'row',
        marginHorizontal: '3%',
        justifyContent: 'center',
        alignItems: 'center',
        // marginVertical: '6%'
        marginVertical:'2%',
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
    policyText: {
        width: '90%',
        marginHorizontal: '5%',
        lineHeight: 28,
        color: Colors.getLightColor('whiteColor'),
        fontFamily: 'Montserrat-Medium',
        marginVertical: '3%',
    },
    policiesText: {
        margin: 50,
        color: Colors.getLightColor('secondaryColor'),
        fontFamily: 'Montserrat-Medium',
    },
    bottomCarView: {
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: '5%',
    },
    bottomCarStyle: {
        // width: '100%',
        // height: '70%',
        width: Dimensions.get('window').width*1,
        height: Dimensions.get('window').height*0.15,
    },
})
export default styles;