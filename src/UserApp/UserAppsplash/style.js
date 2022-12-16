import { StyleSheet } from "react-native";
import Colors from "../../../utility/colors/Colors";
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollViewStyle: {
        backgroundColor: Colors.getLightColor('primaryColor'),
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow: 1
    },
    imageStyle: {
        width: 134,
        height: 124,
        borderRadius: 24,
    },
    appNameText: {
        color: Colors.getLightColor('lightOrange'),
        fontSize: 22,
        fontFamily: 'Montserrat-Medium',
        margin: 10,
        alignSelf: 'center',
        lineHeight: 26,
        fontWeight: "600"
    },
})
export default styles;