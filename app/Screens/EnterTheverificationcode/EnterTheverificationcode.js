import React from 'react';
import { Text, View, ScrollView, Image, TextInput, StyleSheet, SafeAreaView, Button,ToastAndroid } from 'react-native';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
// import IconInput from '../../Comman/GInput';
import fonts from '../../Assets/fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import OTPInput from 'react-native-otp';
// import OTPInputView from '@twotalltotems/react-native-otp-input'
import { GButton } from '../../Comman/GButton';
import AppHeader from '../../Comman/AppHeader';
import ApiCallHelper from '../../config/ApiCallHelper'
import Helper from '../../config/Helper'
import Constant from '../../config/Constant'
import { handleNavigation } from '../../navigation/Navigation';

export default class EnterTheverificationcode extends React.Component {
    constructor(props) {
        super(props);
        this.num1 = React.createRef()
        this.num2 = React.createRef()
        this.num3 = React.createRef()
        this.num4 = React.createRef()
        this.state = {
            otp1: '',
            otp2:"",
            otp3:"",
            otp4:"",
            mobile_number:"",
            name:"",
            email:"",
            password:"",
            device_key:""
        }
        AppHeader({
            ...this.props.navigation, leftTitle: '',
            hideLeftBackIcon: false,
        })
    }

    componentDidMount = () => {
        console.log(this.props.route.params)
        if(this.props.route.params)
        {
            this.setState({
                mobile_number: this.props.route.params.data.mobile,
                password: this.props.route.params.data.password,
                name: this.props.route.params.data.name,
                device_key: this.props.route.params.data.device_key,

            })
        }
    }

    clearOTP = () => {
        this.setState({ otp: undefined })
    }

    autoFill = () => {
        this.setState({ otp: '' })
    }

    goToVerified() {
      //  this.props.navigation.navigate('Verified')
      var otp = this.state.otp1 + this.state.otp2 + this.state.otp3 + this.state.otp4
      if(otp.length < 4)
      {
         
  
          ToastAndroid.show("Please Enter Right Otp", ToastAndroid.SHORT);
          
  
      }
      else if(this.state.mobile_number == "")
      {

        ToastAndroid.show("Mobile Number Not empty", ToastAndroid.SHORT);

      }
      else{
        var data = {}
        data.mobile = this.state.mobile_number
        data.password = this.state.password
        data.device_key = Helper.device_token
        data.otp = otp
        data.name = this.state.name
        Helper.globalLoader.showLoader();
        
        ApiCallHelper.getNetworkResponce("verify-otp", JSON.stringify(data), Constant.APIPost).then((response) => {
          Helper.globalLoader.hideLoader();
          let data = response.data
          console.log(data);
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
      }
    }

    inputNumber(value, flag,name) {
        const completeFlag = `num${flag}`
        this.setState({[name]: value})
        flag = flag + 1
        if (flag < 5 && value) {
            const nextFlag = `num${flag}`
            const textInputToFocus = this[nextFlag]
            textInputToFocus.current.focus()
        }
    }
    

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white ,}}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>
                    <View style={{ alignItems: 'center', marginVertical: 5, marginTop: '30%' }}>
                        <View style={{ width: 200, justifyContent: 'center' }}>
                            <Text style={{
                                textAlign: 'center', fontSize: fonts.fontSize14,
                                color: Colors.black, fontWeight: 'bold',
                                fontFamily: fonts.RoBoToMedium_1
                            }}>Enter The verification code</Text>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>

                        <View style={{ height: 48, width: 48, borderWidth: 1, borderColor: '#D4D4D4', borderRadius: 48 / 2, justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                value={this.state.otp1}
                                onChangeText={number => this.inputNumber(number, 1,"otp1")}

                                ref={this.num1}
                                maxLength={1}
                            keyboardType="numeric"
                                
                                style={{ fontSize: 20, textAlign: 'center' }}
                            />
                        </View>
                        <View style={{ height: 48, width: 48, marginHorizontal: 10, borderColor: '#D4D4D4', borderWidth: 1, borderRadius: 48 / 2, justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                 ref={this.num2}
                                 value={this.state.otp2}
                                onChangeText={number => this.inputNumber(number, 2,"otp2")}
                                keyboardType="numeric"

                                maxLength={1}
                                style={{ fontSize: 20, textAlign: 'center' }}
                            />
                        </View>
                        <View style={{ height: 48, width: 48, borderWidth: 1, borderRadius: 48 / 2, borderColor: '#D4D4D4', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                 ref={this.num3}
                                 value={this.state.otp3}
                                onChangeText={number => this.inputNumber(number, 3,"otp3")}
                                keyboardType="numeric"

                                maxLength={1}
                                style={{ fontSize: 20, textAlign: 'center' }}
                            />
                        </View>
                        <View style={{ height: 48, width: 48, marginLeft: 10, borderWidth: 1, borderRadius: 48 / 2, borderColor: '#D4D4D4', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                ref={this.num4}
                                value={this.state.otp4}
                                onChangeText={number => this.inputNumber(number, 4,"otp4")}
                                keyboardType="numeric"

                                maxLength={1}
                                style={{ fontSize: 20, textAlign: 'center' }}
                            />
                        </View>
                    </View>


                    {/* <View>
<OTPInputView
                            style={{ width: '60%', height: 50, }}
                            pinCount={4}
                            onCodeChanged={code => { this.setState({  }) }}
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                        /> 
</View> */}



                    <View style={{
                        marginVertical: 10,
                        marginTop: 15,
                        marginHorizontal: 25
                    }}>
                        <GButton
                            Text='VERIFY'
                            width={'90%'}
                            height={50}
                            borderRadius={25}
                            onPress={() => { this.goToVerified() }}
                        />
                    </View>


                    <View style={{
                        alignItems: 'center', justifyContent: 'space-between', marginVertical: 10,
                        flexDirection: 'row', marginHorizontal: 40
                    }}>

                       


                        <TouchableOpacity onPress={this.autoFill} style={{alignSelf:'flex-end'}}>
                            <Text style={{ color: '#000', fontSize: 12 }}>Resend OTP after 30 sec</Text>
                        </TouchableOpacity>



                    </View>




                </ScrollView>
            </SafeAreaView>
        )
    }

};


const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 50,
        height: 50,

        borderWidth: 1,
        fontSize: 25,
        borderRadius: 3,
        borderColor: 'black'
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
});
