import { StyleSheet } from "react-native";
import Colors from "../../utility/colors/Colors";
const styles = StyleSheet.create({
    mainView: {
        overflow: 'hidden',
        alignItems: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        marginLeft: '3%'
    },
    touchableDrawer: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 10,
    },
    DrawerIcon: {
        alignSelf: 'center',
        backgroundColor: Colors.getLightColor('primaryColor'),
        borderRadius: 30,
        padding: '2%',
    },
});
export default styles;