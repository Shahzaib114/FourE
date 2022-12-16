import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../utility/colors/Colors";

const styles = StyleSheet.create({
    container: { flex: 1 },
    backArrow: {
        margin: '5%',
        backgroundColor: Colors.getLightColor('whiteColor'),
        borderRadius: 10,
        width: '8%',
        textAlignVertical: 'center',
        paddingVertical: '2.5%',
        alignItems: 'center',
        textAlign: 'center'
    },
    uploadFilesText: {
        marginLeft: '5%',
        color: Colors.getLightColor('whiteColor'),
        fontSize: 35,
        fontWeight: '600',
        marginTop: '10%',
        fontFamily: 'Montserrat-Medium',
    },
    imagesMainView: {
        height: Dimensions.get("screen").height * 0.5,
        width: '97%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: '2%',
        paddingLeft: '4%'
    },
    ModalStyle: {
        height: '20%',
        width: '90%',
        margin: '5%',
        backgroundColor: Colors.getLightColor('whiteColor'),
        borderRadius: 5,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    beforeImageOpacity: {
        width: '90%',
        height: '85%',
        backgroundColor: Colors.getLightColor('whiteColor'),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.getLightColor('blackColor'),
        borderWidth: 1,
        marginLeft: '5%',
        borderRadius: 10
    },
    afterImageView: {
        width: '90%',
        height: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.getLightColor('blackColor'),
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: '5%'
    },
    afterImageStyle: {
        width: '100%',
        height: '100%'
    },
    afterImageeditButton: {
        margin: '5%',
        alignSelf: 'flex-end',
        backgroundColor: Colors.getLightColor('whiteColor'),
        padding: '2%',
        borderRadius: 4,
        textAlign: 'center'
    },
    licenseFrontView: {
        width: Dimensions.get("screen").width * 0.46,
        height: Dimensions.get("screen").height * 0.15,
        marginBottom: '3%'
    },
    licenseBackView: {
        width: Dimensions.get("screen").width * 0.46,
        height: Dimensions.get("screen").height * 0.15,
    },
    imageText: {
        fontSize: 14,
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium',
    },
    cameraOpacity: {
        width: '50%',
        marginHorizontal: '5%',
        backgroundColor: Colors.getLightColor('darkBlueColor'),
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: '4%',
        borderRadius: 5,
        flexDirection: 'row'
    },
    galleryOpacity: {
        width: '50%',
        marginHorizontal: '5%',
        backgroundColor: Colors.getLightColor('lightGreenColor'),
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: '4%',
        borderRadius: 5,
        flexDirection: 'row'
    },
    continueOpacity: {
        width: '90%',
        margin: '5%',
        backgroundColor: Colors.getLightColor('secondaryColor'),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '4%',
        borderRadius: 5,
    },
    cancelOpacity: {
        width: '90%',
        backgroundColor: '#0887FC',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3%',
        borderRadius: 5
    },

    contnueText: {
        color: Colors.getLightColor('whiteColor'),
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '500',
        fontFamily: 'Montserrat-Medium',
    },
    BottomLineView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '3%'
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

});
export default styles;