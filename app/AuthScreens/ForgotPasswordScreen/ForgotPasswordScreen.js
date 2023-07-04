import React from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, Animated, SafeAreaView, Keyboard, Platform } from 'react-native';
import styles from './ForgotPasswordScreenStyles';
import { GButton } from '../../Comman/GButton';
import { SocialButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import IconInput from '../../Comman/Input';
import fonts from '../../Assets/fonts';
import Constant from '../../config/Constant';
import Helper from '../../config/Helper';
import ApiCallHelper from '../../config/ApiCallHelper';

export default class ForgotPasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                mobile_number:'', 
        
        }
    }

    componentDidMount() {

    }

   

    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <ImageBackground source={images.MaskGroup} style={{ flex: 1 }} resizeMode="cover">
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                            <Image source={images.logo} style={{ width: 100, height: 100 }} resizeMode={'contain'} />
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                            <Text style={{ color: Colors.white, fontSize: fonts.fontSize26, fontFamily:fonts.RoBoToBold_1,fontWeight:'bold' }}>Forgot Password?</Text>
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: Colors.white, fontSize: fonts.fontSize12, fontFamily:fonts.RoBoToRegular_1 }}>Enter your Phone Number to retrieve your password</Text>
                        </View>

                        <View style={{ marginTop: 50 }}>
                            <View style={{ marginHorizontal: 25 }}>
                                <IconInput
                                    placeholder="Mobile Number / E-mail"
                                    placeholderTextColor={Colors.black}
                                    keyboardType={'phone-pad'}
                                    returnKeyType="done"
                                    // getFocus={(input) => { this.confirm_password = input }}
                                    setFocus={() => { this.submit_forgot_password() }}
                                onChangeText={(mobile_number) => this.setState({mobile_number : mobile_number})}
                                value={this.state.mobile_number}

                                />
                            </View>



                            <View style={{ marginVertical: 15,  marginHorizontal: 40 }}>
                                <GButton
                                    Text='RECOVER PASSWORD'
                                    width={'100%'}
                                    height={50}
                                    borderRadius={25}
                                    onPress={() => {this.submit_forgot_password() }}
                                // onPress={() => { this.login_Submit() }}
                                />
                            </View>

                        </View>
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>
        )
    }
    submit_forgot_password(){
       
        Keyboard.dismiss()
        if (this.state.mobile_number == '') {
            Helper.showToast('Please enter mobile number')
            return false;
          } if (this.state.mobile_number.length < 10) {
            Helper.showToast('Please enter valid mobile number')
            return false;
          }
          var data = {}
          data.mobile = this.state.mobile_number
          
          Helper.globalLoader.showLoader();
          ApiCallHelper.getNetworkResponce(Constant.forgotPassword, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            let data = response.data
            if (response.status == true) {
                Helper.showToast(response.message)
                this.props.navigation.navigate('LoginScreen')
            } else {
              Helper.showToast(response.message)
            }
          }).catch(err => {
              Helper.globalLoader.hideLoader();
          })
      //  this.props.navigation.navigate('VerifyingDetails')
    }

};






