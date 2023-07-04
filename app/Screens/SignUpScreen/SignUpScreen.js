import React from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, } from 'react-native';
import styles from './SignUpScreenStyles';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import IconInput from '../../Comman/Input';
import ApiCallHelper from '../../config/ApiCallHelper'
import Helper from '../../config/Helper'
import Constant from '../../config/Constant'
import { handleNavigation } from '../../navigation/Navigation';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export default class SignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCameraShow: false,
            CheckedBox: false,
            Full_Name: '',
            Mobile_Number: '',
            Password: '',
            PasswordIcon: true

        }
    }

    componentDidMount() {

    }



    ShowPassword () {
        this.setState({ PasswordIcon: !this.state.PasswordIcon })
    }
    onChangeCheckedBox = () => {
        this.setState({ CheckedBox: !this.state.CheckedBox })
    }


    goToLogin() {
        this.props.navigation.navigate('LoginScreen')
    }

    goToVerifyingDetails() {
       

        if (this.state.Full_Name == "") {
            Helper.showToast('Please enter full name')
            return false;
        } if (this.state.Mobile_Number == '') {
            Helper.showToast('Please enter mobile number')
            return false;
        } if (this.state.Mobile_Number.length < 10) {
            Helper.showToast('Please enter valid mobile number')
            return false;
        } if (this.state.Password == '') {
            Helper.showToast('Please enter password')
            return false;
        } if (this.state.Password.length < 6) {
            Helper.showToast('Please enter valid password')
            return false;
        }
        if(this.state.CheckedBox ==false){
            Helper.showToast('Please check terms & conditions')
            return false;
        }
        var dataobj = {}
        dataobj.name = this.state.Full_Name
        dataobj.mobile = this.state.Mobile_Number
        dataobj.password = this.state.Password
        dataobj.device_key = Helper.device_token
        Helper.globalLoader.showLoader();
       
                var body = {
                    mobile:this.state.Mobile_Number
                }
                ApiCallHelper.getNetworkResponce("sendotp", JSON.stringify(body), Constant.APIPost).then((response) => {
                        console.log("otpsend,",response)
                    Helper.globalLoader.hideLoader();

                    if (response.status == true) {
                        this.props.navigation.navigate('VerificationCodeSend',{"data":dataobj})
                    }
                    else{
                    Helper.showToast(response.message)

                    }
                }).catch(err => {
                    Helper.globalLoader.hideLoader();
                })

                // Helper.userData = data
                // Helper.setData('user_details', data)
                // Helper.setData('HideWelcomeScreen', "done")
                // Helper.showToast(response.message)
                // handleNavigation({ type: 'setRoot', page: 'BottomTab', navigation: this.props.navigation });
                
      
        //  this.props.navigation.navigate('VerifyingDetails')
    }

    render() {
        return (
            <View style={{backgroundColor:'#F5F5F5',height:heightPercentageToDP(100)}}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>
                    <View style={{ alignItems: 'center', marginTop: '30%' }}>
                        <Image source={images.logo} style={{ height: 90, width: 90 }} resizeMode={'contain'} />
                    </View>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')} style={{ alignItems: 'center', marginTop: '5%' }}>
                        <Text style={{
                            color: '#969696',
                            fontSize: fonts.fontSize14,
                            fontFamily: fonts.RoBoToBold_1
                        }}>Existing user? Log In</Text>
                    </TouchableOpacity>
                    <View style={styles.input_parent_view}>
                        <IconInput
                            placeholder="Full Name "
                            placeholderTextColor={Colors.black}
                            setFocus={() => { this.Mobile_Number.focus(); }}
                            returnKeyType="next"
                            maxLength={30}
                            keyboardType={'default'}
                            onChangeText={(Full_Name) => { this.setState({ Full_Name }) }}
                            value={this.state.Full_Name}
                        />

                        <IconInput
                            placeholder="Mobile Number"
                            placeholderTextColor={Colors.black}
                            getFocus={(input) => { this.Mobile_Number = input }}
                            setFocus={(input) => { this.Password.focus(); }}
                            returnKeyType="next"
                            maxLength={60}
                            keyboardType={'phone-pad'}
                            onChangeText={(Mobile_Number) => this.setState({ Mobile_Number })}
                            value={this.state.Mobile_Number}
                        />

                        <IconInput
                           
                            imagePathRight={this.state.PasswordIcon ? images.eye_hidden : images.eye}
                            show={() => {  }}

                            tintColor={Colors.black}
                            rightHeight={16}
                            rightWidth={22}
                            placeholder="Password"
                            placeholderTextColor={Colors.black}
                            secureTextEntry={true}
                            getFocus={(input) => { this.Password = input }}
                            secureTextEntry={this.state.PasswordIcon}
                            ClickPass={()=> this.ShowPassword()}
                            // setFocus={() => { this.goToVerifyingDetails() }}
                            // setFocus={() => { this.signup_Submit() }}
                            returnKeyType="done"
                            maxLength={12}
                            keyboardType={'default'}
                            onChangeText={(Password) => this.setState({ Password })}
                            value={this.state.Password}
                        />
                    </View>

                    <View style={styles.sign_up_btn}>
                        <GButton
                            Text='VERIFY'
                            width={'100%'}
                            height={50}
                            borderRadius={25}
                            onPress={() => { this.goToVerifyingDetails() }}
                        // onPress={() => { this.login_Submit() }}
                        />
                    </View>

                    <View
                        style={styles.check_box_text_view}>
                        <TouchableOpacity
                            onPress={() => { this.onChangeCheckedBox(); }}
                            hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
                            style={styles.check_box_touch} >
                            <Image resizeMode={'cover'} source={this.state.CheckedBox ? images.correct : images.unchecked} style={styles.box_check_img} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.webPage()}>
                        <Text style={styles.terms_text}>By signing up you agree to our Terms & Conditions.</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }

webPage(){
    
   // this.props.navigation.navigate("WebPage")
    this.props.navigation.navigate("WebPage",{title : "Terms & Conditions", link : Constant.TermsAndCondition})
}

};
