import React from 'react';
import { Text, View, ScrollView, Image, DeviceEventEmitter, TouchableOpacity, SafeAreaView, } from 'react-native';
import styles from './SelectPaymentModeStyles';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import AppHeader from '../../Comman/AppHeader';
import Helper from '../../config/Helper';
import ApiCallHelper from '../../config/ApiCallHelper'
import Constant from '../../config/Constant'
import moment from 'moment'
import RazorpayCheckout from 'react-native-razorpay';


export default class SelectPaymentMode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCashonhome: true,
            isCreditCard: false,
            isDebitCard: false,
            isNetBanking: false,
            paymentType: "",
            transtionId:'1234',
            data: this.props.route.params?.data,
            slotTime: this.props.route.params?.slotTime,
            lastAmount : this.props.route.params?.lastAmount,
            selectedProductArr : this.props.route.params?.selectedProductArr,
            arrpaymentType: [
                { type: "Cash on home", id: "1" },
             { type: "Online Pay", id: "2" }
            ],
                transtionStatus:true
        }
        AppHeader({ ...this.props.navigation, leftTitle: 'Select Payment Mode', })
    }
    componentDidMount() {
        console.log("data---", this.state.selectedProductArr);
    }

    bookNow() {

        if (this.state.paymentType == "") {
            Helper.showToast("Please select payment type")
            return
        }

        if(this.state.paymentType == "2"){
            var options = {
                description: 'Credits towards consultation',
                image: 'https://i.imgur.com/3g7nmJC.png',
                currency: 'INR',
                key:  "rzp_live_ksXISUNPc6yEZr",// "rzp_test_LgmsMAARAzDFGw", //'rzp_test_wRvqcraPmLCJkC', // Your api key
                amount: Number(this.state.lastAmount) *100,
                name: Helper.userData.name,
                prefill: {
                  email: Helper.userData.email,
                  contact: Helper.userData.mobile,
                  name: 'Razorpay Software'
                },
                theme: {color: '#000000'}
              }
              RazorpayCheckout.open(options).then((data) => {
                  console.log("PaymentOption--------------",JSON.stringify(data));
                // handle success
                this.bookService(data.razorpay_payment_id)
            //    alert(`Success: ${data.razorpay_payment_id}`);
              }).catch((error) => {
                // handle failure
                console.log("Paymenterror--------------",JSON.stringify(error));

               alert(`Error: ${error.code} | ${error.description}`);
              });
            return
        }else{
           this.bookService("1")
        }
    }

    bookService(trnId) {  
                var data = {}
                data.user_id = Helper.userData.id
                data.address_id = this.state.data.addressId
                data.delivery_date = this.state.slotTime.date
                data.delivery_time = this.state.slotTime.time
                data.total_amount = this.state.data.data.totalAmount
                data.cart_data = this.state.data.data.arrService
                data.paymentType = this.state.paymentType
                data.addProduct =  this.state.selectedProductArr
                data.transtionId =  trnId == '1' ? "" : trnId
                data.transtionStatus =  this.state.transtionStatus
                data.charge_1 =  Helper.charge1
                data.charge_2 =  Helper.charge2
                data.discount_amount = this.props.route.params?.couponData?.discount_amount
                data.coupon_code = this.props.route.params.couponData.coupon_code
                data.total_payble_amt = this.state.lastAmount


                console.log("send data--", JSON.stringify(data));



                
                
                Helper.globalLoader.showLoader();
                ApiCallHelper.getNetworkResponce(Constant.saveBooking, JSON.stringify(data), Constant.APIPost).then((response) => {
                    Helper.globalLoader.hideLoader();
                    if (response.status == true) {
                       // Helper.removeItemValue('CartItem')
                        this.props.navigation.navigate('Booking')
                        DeviceEventEmitter.emit("bookingComplete", "done")
                    } else {
                        Helper.showToast(response.message)
                    }
                }).catch(err => {
                    Helper.globalLoader.hideLoader();
                })
        
            }

    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>

                    <View style={{
                        marginVertical: 10,
                        marginTop: 33,
                        paddingHorizontal: 10,
                        marginHorizontal: 25,
                        paddingVertical: 15,
                        backgroundColor: Colors.white,
                        borderRadius: 5,
                        borderColor: Colors.whiteTwo,
                        elevation: 1.5,
                        shadowOpacity: 0.5,
                        shadowColor: '#172C3326',

                    }}>

                        {this.state.arrpaymentType.map((item, index) => {
                            return <View>
                                <View style={{ height: index == 0 ? 0 : 1, backgroundColor: '#c5c5c5', marginVertical: index == 0 ? 0 : 15 }}></View>
                                <TouchableOpacity onPress={() => { this.setState({ paymentType: item.id }) }} style={[styles.lang_radio_touch_text, { marginTop: 0 }]}>
                                    <Image
                                        source={this.state.paymentType == item.id ? images.radio_btn_selected : images.radio_btn_un_selected}
                                        style={styles.radio_img}
                                    />
                                    <Text style={styles.lang_select_text}>{item.type}</Text>
                                </TouchableOpacity>
                            </View>
                        })}


                    </View>

                    <View style={styles.update_btn_view}>
                        <GButton
                            Text='Proceed'
                            width={'35%'}
                            height={45}
                            borderRadius={22.5}
                            onPress={() => { this.bookNow() }}
                        // onPress={() => { this.login_Submit() }}
                        />
                    </View>

                </ScrollView>
            </SafeAreaView>
        )
    }

};
