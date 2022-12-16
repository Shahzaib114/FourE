import { StyleSheet, Dimensions, } from "react-native";
import Colors from "../../utility/colors/Colors";
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    title: {
        fontSize: 22,
    },
    scrollViewStyle: {
        backgroundColor: Colors.getLightColor('primaryColor'),
    },
    contentContainer: {
        flexGrow: 1
    },
    vehicleInfoText: {
        marginHorizontal: "5%",
        fontSize: 30,
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium',
    },
    TextInputSection: {
        height: Dimensions.get('window').height * 0.35
    },
    TextInputField: {
        flexDirection: 'row',
        marginLeft: '5%',
        width: '90%',
    },
    PlaceholderStyling: {
        width: '90%',
        fontSize: 14,
        color: Colors.getLightColor('whiteColor'),
        alignSelf: 'center',
    },
    vehicleNumberMainView: {
        height: '70%',
        marginBottom: '2%',
        marginTop: '3%',
        justifyContent: 'center',
    },
    vehicleNumberscndMainView: {
        width: '90%',
        marginHorizontal: '5%',
        flexDirection: 'row',
    },
    userNameView: {
        flexDirection: 'row',
    },
    vehicleNumberInput: {
        width: '80%',
        fontSize: 14,
        color: Colors.getLightColor('whiteColor'),
        marginLeft: '3%',
        alignSelf: 'center',
    },
    vehicleModelInput: {
        width: '90%',
        fontSize: 14,
        color: Colors.getLightColor('whiteColor'),
        marginLeft: '2%',
        alignSelf: 'center',
    },
    vehicleColorMainView: {
        width: '90%',
        marginHorizontal: '5%',
        flexDirection: 'row',
        marginTop: '1%',
    },
    errorText: {
        width: '80%',
        marginHorizontal: '10%',
        fontFamily: 'Montserrat-Italic',
        fontSize: 12,
        color: Colors.getLightColor('mustardColor')
    },
    carPicturesContainer: {
        paddingHorizontal: '4%',
        width: '100%',
        height: Dimensions.get("screen").height * 0.33,
    },
    carPicturesText: {
        fontSize: 24,
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '600'
    },
    addImagesOpacity: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.getLightColor('whiteColor'),
        width: '90%',
        borderWidth: 1,
        borderColor: Colors.getLightColor('lightGreyColor'),
        borderRadius: 10,
        paddingVertical: '3%',
        marginHorizontal: '5%',
        bottom: 2
    },
    interiorExtreiorText: {
        color: Colors.getLightColor('whiteColor'),
        fontFamily: 'Montserrat-Medium', fontSize: 14
    },
    addImageText: {
        margin: '5%',
        color: Colors.getLightColor('blackColor'),
        fontFamily: 'Montserrat-Medium',
    },
    inputIconStyle: {
        alignSelf: 'center',
        marginRight: '3%',
    },
    imageOpacity: {
        width: '85%',
        height: '75%',
        backgroundColor: Colors.getLightColor('whiteColor'),
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 2,
        borderColor: Colors.getLightColor('greyColor'),
        marginLeft: '10%',
        alignItems: 'center',
        borderRadius: 10,
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
    interiorImages: {
        width: Dimensions.get("screen").height * 0.10,
        height: Dimensions.get("screen").height * 0.08,
        borderRadius: 10,
        marginLeft: 10, right: 5
    },
    uploadAgainView: {
        width: '90%',
        margin: '1%',
        backgroundColor: Colors.getLightColor('secondaryColor'),
        marginHorizontal: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '1%',
        borderRadius: 5,
        marginBottom: '3%'
    },
    contnueText: {
        color: Colors.getLightColor('whiteColor'),
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '500',
        fontFamily: 'Montserrat-Medium',
    },
    uploadagainText: {
        color: Colors.getLightColor('whiteColor'),
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '500',
        fontFamily: 'Montserrat-Medium',
    },
    BottomLineView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    creatAccount: {
        color: Colors.getLightColor('whiteColor'),
        fontFamily: 'Montserrat-Medium',
    },
    LoginTouch: {
        marginLeft: 5,
        color: Colors.getLightColor('secondaryColor'),
        fontFamily: 'Montserrat-Medium',
    }
})
export default styles;