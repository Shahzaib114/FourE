import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../utility/colors/Colors";
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollViewStyle: {
        backgroundColor: Colors.getLightColor('whiteColor'),
    },
    contentContainer: {
        flexGrow: 1,
    },
    mainView: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: '2.5%',
        height: Dimensions.get('window').height * 0.06
    },
    indicator: {
        alignSelf: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height * 0.95,
    },
    namesText: {
        color: Colors.getLightColor('blackColor'),
        fontSize: 12,
        fontFamily: 'Montserrat-Medium',
        fontWeight: '500',
        lineHeight: 15,
        marginVertical: '3%'
    },
    imageHeaderView: {
        width: '50%',
        marginHorizontal: '25%',
        height: Dimensions.get("screen").height * 0.2,
        alignItems: 'center',
    },
    mainContainer: {
        height: Dimensions.get('window').height * 0.90,
        justifyContent: 'space-around'
    },
    beforeImageStyle: {
        width: Dimensions.get('window').width*0.4,
        height: Dimensions.get('window').width*0.4,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    camerIconStyle: {
        padding: '5%',
        backgroundColor: Colors.getLightColor('verticalLineColor'),
        borderRadius: 5,
    },
    inputMainView: {
        width: '90%',
        marginHorizontal: '5%',
        marginTop: '3%',
        height: Dimensions.get("screen").height * 0.45,
    },
    textualInputscndryView: {
        width: '100%',
        flexDirection: 'row',
    },
    lastNameView: {
        marginLeft: '5%',
        width: '47.5%'
    },
    emailandphoneView: {
        width: '100%',
        marginTop: '5%'
    },
    TextInputField: {
        flexDirection: 'row',
        backgroundColor: Colors.getLightColor('greyColor'),
        borderRadius: 10,
        width: '100%',
    },
    PlaceholderStyling: {
        width: '90%',
        paddingLeft: 10,
        fontSize: 14,
        color: Colors.getLightColor('blackColor'),
        alignSelf: 'center',
        fontWeight: '500',
        fontFamily: 'Montserrat-Medium'
    },
    continueOpacity: {
        width: '90%',
        marginHorizontal: '5%',
        backgroundColor: Colors.getLightColor('primaryColor'),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '4%',
        borderRadius: 5,
        flexDirection: 'row'
    },
    contnueText: {
        color: Colors.getLightColor('whiteColor'),
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '500',
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