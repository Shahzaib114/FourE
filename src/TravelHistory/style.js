import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../utility/colors/Colors";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.getLightColor('whiteColor'),
    },
    scrollViewStyle: {
        backgroundColor: Colors.getLightColor('whiteColor'),
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mappingOuterView: {
        width: '97%',
        margin: '2.5%',
        overflow: 'hidden',
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        height: Dimensions.get('window').height * 0.77,
    },
    emptyText: {
        lineHeight: 22,
        color: Colors.getLightColor('primaryColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium',
        fontSize: 22
    },
    allitemsView: {
        width: '100%',
        backgroundColor: Colors.getLightColor('primaryColor'),
        borderRadius: 10,
        elevation: 5,
        shadowColor: Colors.getLightColor('blackColor'),
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        borderRadius: 10,
        marginVertical: '2%',
        flexDirection: 'row',
    },
    textualMainView: {
        marginVertical: '1%',
        marginLeft: '5%',
        width: '60%',
    },
    userNameText: {
        color: Colors.getLightColor('whiteColor'),
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
    },
    locationtypeText: {
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium',
        fontSize: 10
    },
    datedView: {
        marginLeft: '1%',
        width: '35%',
        justifyContent: 'center'
    },
    datedText: {
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '400',
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
    },
    completedRejectedText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 13,
        margin: '2%',
        borderRadius: 10
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