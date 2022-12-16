import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto';
import styles from './style';
import CustomBackArrow from '../CustomBackArrow';
const SignupOptions = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.contentContainer}>
                <CustomBackArrow />
                <Image source={require('../../assets/Images/vectorimagefemale.png')} style={{ margin: "5%", marginTop: '10%' }}></Image>
                <Text style={styles.signuptext}>
                    Sign Up
                </Text>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('EmailSignupFirstPart')}
                        style={styles.touchableView}>
                        <View style={styles.emailView}>
                            <Fontisto name='email' size={20} color="white" style>
                            </Fontisto>
                            <Text style={styles.emailtext}>
                                Sign up with email
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.lineView}>
                        <View style={styles.lineStyle} />
                        <View>
                            <Text style={styles.andText}>OR</Text>
                        </View>
                        <View style={styles.lineStyle} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('EmailSignupFirstPart')}
                        style={styles.touchableViewgoogle}>
                        <View style={styles.emailView}>

                            <Image source={require('../../assets/Images/googleImage.png')}>

                            </Image>
                            <Text style={styles.googletext}>
                                Sign up with google
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.BottomLineView}>
                    <Text style={styles.creatAccount}>
                        Already member |
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                        <Text style={styles.LoginTouch}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
export default SignupOptions;