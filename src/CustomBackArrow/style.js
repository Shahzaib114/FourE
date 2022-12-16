import { StyleSheet } from "react-native";
import Colors from "../../utility/colors/Colors";
const styles = StyleSheet.create({
    HeaderViewStyle: {
        alignSelf: 'flex-start',
        overflow: 'hidden',
        paddingLeft: '1%',
        paddingRight: '1%',
        borderRadius: 10
    },
    OpacityStyle: {
        backgroundColor: '#fff',
        width: '13%',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 10,
        paddingVertical: '3%',
        paddingHorizontal: '2%'
    },
    ArrowIconStyle: {
        alignSelf: 'center',
        backgroundColor: Colors.getLightColor('primaryColor'),
        padding: '2%',
        marginLeft: '4%',
        borderRadius: 30
    },
});
export default styles;