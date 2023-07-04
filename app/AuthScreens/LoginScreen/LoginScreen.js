import React from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, SafeAreaView, Keyboard, Platform } from 'react-native';
import styles from './LoginScreenStyles';
import { GButton } from '../../Comman/GButton';
import { SocialButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import IconInput from '../../Comman/Input';
import fonts from '../../Assets/fonts';
import { handleNavigation } from '../../navigation/Navigation';
import ApiCallHelper from '../../config/ApiCallHelper'
import Helper from '../../config/Helper'
import Constant from '../../config/Constant'
import { heightPercentageToDP } from 'react-native-responsive-screen';
export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PasswordIcon: true,
            mobile_number: '',
            password: ''
        }
    }

    componentDidMount() {
    }
    ShowPassword () {
        this.setState({ PasswordIcon: !this.state.PasswordIcon })
    }
    // login_Submitqqdse() {
    //     handleNavigation({ type: 'setRoot', page: 'BottomTab', navigation: this.props.navigation })
    // }

    goToForgotPass() {
        this.props.navigation.navigate('ForgotPasswordScreen')
    }

    goToSingUp() {
        this.props.navigation.navigate('SignUpScreen')
    }

    login_Submit() {
        Keyboard.dismiss()
        if (this.state.mobile_number == '') {
            Helper.showToast('Please enter mobile number')
            return false;
          } if (this.state.mobile_number.length < 10) {
            Helper.showToast('Please enter valid mobile number')
            return false;
          }if (this.state.password == '') {
            Helper.showToast('Please enter password')
            return false;
          } if (this.state.password.length < 6) {
            Helper.showToast('Please enter valid password')
            return false;
          }
          
          var data = {}
          data.input = this.state.mobile_number
          data.password = this.state.password
          data.device_key = Helper.device_token

          Helper.globalLoader.showLoader();
          
          ApiCallHelper.getNetworkResponce(Constant.login, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            let data = response.data
            if (response.status == true) {
             Helper.userData = data
             Helper.setData('user_details', data)
             Helper.setData('HideWelcomeScreen', "done")
             handleNavigation({ type: 'setRoot', page: 'BottomTab', navigation: this.props.navigation })
            } else {
              Helper.showToast(response.message)
            }
          }).catch(err => {
              Helper.globalLoader.hideLoader();
          })
      //  this.props.navigation.navigate('VerifyingDetails')
    }


    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>
                <View style={{backgroundColor:'#F5F5F5',height:heightPercentageToDP(100)}}>
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>
                        <View style={{
                            justifyContent: 'center',
                            marginHorizontal: 16,
                            alignItems: 'flex-end',
                            marginTop: 35
                        }}>
                            {/* <TouchableOpacity
                                onPress={() => this.goToSingUp()}
                                style={{ backgroundColor: Colors.white, paddingHorizontal: 20, paddingVertical: 5, borderRadius: 15 }}>
                                <Text style={{ color: '#241111', fontsize: fonts.fontSize12, fontFamily: fonts.RoBoToRegular_1 }}>Skip</Text>
                            </TouchableOpacity> */}
                        </View>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 25
                        }}>
                            <Image source={images.logo} style={{ height: 90, width: 90 }} resizeMode={'contain'} />
                        </View>

                        <View style={styles.welcome_text_view}>
                            <TouchableOpacity onPress={()=> this.goToSingUp()}>
                                <Text style={styles.welcome_text}>Don’t have an account? Create an account</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.input_btn_parent_view}>
                            <View style={styles.input_view}>
                                <IconInput
                                    placeholder="Mobile Number"
                                    placeholderTextColor={Colors.black}
                                    keyboardType={'phone-pad'}
                                    setFocus={() => { this.password.focus(); }}
                                    returnKeyType="next"
                                    maxLength={10}
                                    onChangeText={(mobile_number) => this.setState({ mobile_number })}
                                    value={this.state.mobile_number}
                                />

                                <IconInput
                                    placeholder="Password"
                                    secureTextEntry={this.state.PasswordIcon}
                                    imagePathRight={this.state.PasswordIcon ? images.eye_hidden : images.eye}
                                    show={() => { }}
                                    tintColor={Colors.black}
                                    rightHeight={16}
                                    rightWidth={22}
                                    ClickPass={()=> this.ShowPassword()}
                                    maxLength={60}
                                    placeholderTextColor={Colors.black}
                                    keyboardType={'default'}
                                    getFocus={(input) => { this.password = input }}
                                    setFocus={() => { this.login_Submit(); }}
                                    returnKeyType="done"
                                    onChangeText={(password) => this.setState({password})}
                                    value={this.state.password}
                                    placeholder='Password'
                                />

                            </View>
                            <View style={styles.forgot_text_view}>
                                <TouchableOpacity
                                    onPress={() => { this.goToForgotPass() }}
                                    style={styles.forgot_touch}>
                                    <Text style={styles.forgot_text}>Forgot Password?</Text>
                                </TouchableOpacity>

                            </View>


                            <View style={styles.login_btn_view}>
                                <GButton
                                    Text='Log In'
                                    width={'90%'}
                                    height={50}
                                    borderRadius={25}
                                    onPress={() => { this.login_Submit() }}
                                />
                            </View>



                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

};






