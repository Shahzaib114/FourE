import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../utility/colors/Colors";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.getLightColor('whiteColor'),
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
    emptyOuterView: {
        width: '97%',
        margin: '2.5%',
        justifyContent: 'center',
        alignItems: 'center',
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
});
export default styles;