import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../../utility/colors/Colors";
const styles = StyleSheet.create({
  scrollViewStyle: {
    backgroundColor: Colors.getLightColor('primaryColor'),
    flexGrow: 1
  },
  contentContainer: {
    justifyContent: 'center',
  },
  logoImageView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.20
  },
  FourDigitTetx: {
    margin: '5%',
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.getLightColor('whiteColor'),
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 14,
    fontFamily: 'Montserrat-Medium',
  },
  RetryText: {
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.getLightColor('whiteColor'),
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 14,
    fontFamily: 'Montserrat-Medium',
    margin: '3%',
    marginTop: '8%'
  },
  codeInput: {
    width: '95%',
    backgroundColor: '#F1F5F9',
    padding: 10,
    color: Colors.getLightColor('blackColor'),
    margin: '2.5%',
    borderRadius: 10
  },
  touchableView: {
    width: '90%',
    backgroundColor: Colors.getLightColor('secondaryColor'),
    margin: '5%',
    borderRadius: 5,
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: '5%',
  },
  emailtext: {
    color: Colors.getLightColor('whiteColor'),
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
});
export default styles;