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
        flexGrow: 1
    },
    headerView: {
        width: '100%',
        height: Dimensions.get('window').height * 0.22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    createtext: {
        fontSize: 35,
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium',
        alignSelf: 'center'
    },
    TextInputSection: {
        height: Dimensions.get('window').height * 0.48,
    },
    rowMainView: {
        flexDirection: 'row',
        width: '100%'
    },
    userHeaderView: {
        width: '42.5%',
        borderRadius: 10,
        marginLeft: '5%'
    },
    userNameView: {
        flexDirection: 'row',
        marginLeft: '5%'
    },
    iconsandInputView: {
        width: '100%',
        flexDirection: 'row'
    },
    TextInputField: {
        marginLeft: '5%',
        marginHorizontal: '2%',
        borderRadius: 15,
        width: '90%',
    },
    PlaceholderStyling: {
        width: '80%',
        fontSize: 14,
        color: Colors.getLightColor('whiteColor'),
        alignSelf: 'center',
    },
    fullNameHeaderView: {
        width: '42.5%',
        borderRadius: 10
    },
    fullNameView: {
        flexDirection: 'row',
        borderRadius: 10,
        marginLeft: '2%'
    },
    errorText: {
        width: '80%',
        marginHorizontal: '10%',
        fontFamily: 'Montserrat-Italic',
        fontSize: 12,
        color: Colors.getLightColor('mustardColor')
    },
    licenseHeader: {
        width: '90%',
        flexDirection: 'row',
        marginHorizontal: '6%'
    },
    licenseInput: {
        width: '80%',
        fontSize: 14,
        color: Colors.getLightColor('blackColor'),
        alignSelf: 'center',
        left: '1%'
    },
    inputIconStyle: {
        alignSelf: 'center',
        marginRight: '3%',
        marginLeft: '3%',
    },
    firstRowInput: {
        width: '45%',
        marginLeft: '1%'
    },
    dateRangeIcon: {
        alignSelf: 'center',
        marginRight: '3%',
        marginLeft: '3%'
    },
    selectedDateOpacity: {
        backgroundColor: Colors.getLightColor('secondaryColor'),
        borderRadius: 2,
        marginTop: '5%'
    },
    licenseExpiryOpacity: {
        backgroundColor: Colors.getLightColor('primaryColor'),
        borderRadius: 2,
        marginVertical: '4%'
    },
    licenseExpiryText: {
        padding: '5%',
        marginBottom: '1%',
        color: Colors.getLightColor('whiteColor')
    },
    selectedDateText: {
        padding: '5%',
        marginBottom: '1%',
        paddingHorizontal: '10%',
        color: Colors.getLightColor('whiteColor')
    },
    userInputIcon: {
        alignSelf: 'center',
        marginRight: '3%',
        marginLeft: '3%',
    },
    BottomLineView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    creatAccount: {
        color: Colors.getLightColor('whiteColor'),
    },
    continueOpacity: {
        width: '90%',
        margin: '2%',
        marginHorizontal: '5%',
        backgroundColor: Colors.getLightColor('secondaryColor'),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '4%',
        borderRadius: 5,
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
    },
    bottomImageStyle: {
        width: '100%',
        height: Dimensions.get('window').height * 0.2,
    },
})
export default styles;