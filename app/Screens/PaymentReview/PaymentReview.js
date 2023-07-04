import React from 'react';
import { Text, View, ScrollView, FlatList, Image, couponModalVisible, Modal, Dimensions, TouchableOpacity, SafeAreaView, TextInput, } from 'react-native';
import styles from './PaymentReviewStyles';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import ViewPager from '@react-native-community/viewpager';
import AppHeader from '../../Comman/AppHeader';
import Constant from '../../config/Constant';
import ApiCallHelper from '../../config/ApiCallHelper';
import Helper from '../../config/Helper';


export default class PaymentReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.route.params?.data,
            slotTime: this.props.route.params.slotTime,
            couponModalVisible: false,
            arrCoupon: [],
            promoCode: '',
            coupondiscountAmount: 0,
            totalAmount: this.props.route.params?.data?.data?.totalAmount + (Number(Helper.charge1) + Number(Helper.charge2)),
            productTotalAmount: 0,
            proLength: this.props.route.params?.selectedProductArr
        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Payment Review', borderBottomRadius: 0,
            bellIcon: false,
            settingsIcon: false,
            headerBg: false,
            hideLeftBackIcon: false,
        })
    }


    componentDidMount() {
        let productData = this.props.route.params?.selectedProductArr
        if (productData) {
            productData.map((item, index) => {
                console.log("price---------------------", item.price);
                this.state.productTotalAmount = Number(this.state.productTotalAmount) + Number(item.price) * item.quantity
                this.setState({})
            })
        }

        this.setState({totalAmount : Number(this.state.totalAmount) + Number(this.state.productTotalAmount)})

        //this.getCouponList()
    }


    getCouponList() {
        let data = {
            // user_id: Helper.userData.id
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.couponList, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("arrCoupon ----------", response.data)
            if (response.status == true) {
                this.setState({ arrCoupon: response.data, couponModalVisible: true })
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    render() {
        let data = this.state.data?.data
        return (
            <SafeAreaView style={styles.safe_area_view}>
                {this.couponModal()}
                <ScrollView>

                    <View style={{ marginTop: 10 }}>
                        <View style={{
                            borderColor: '#FCFBFB', marginBottom: 5,
                            backgroundColor: Colors.white, borderWidth: 1,
                            elevation: 2, marginHorizontal: 20, borderRadius: 8
                        }}>


                            <View style={{ flexDirection: 'column', paddingVertical: 20, paddingHorizontal: 15 }}>

                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Text style={{ padding: 5, flex: 1, color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsExtraBold, fontWeight: 'bold' }}>Service Charge</Text>
                                    <Text style={{ padding: 5, color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsExtraBold, }}>Rs. {data.totalAmount}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Text style={{ padding: 5, flex: 1, color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsExtraBold, fontWeight: 'bold' }}>Product Amount </Text>
                                    <Text style={{ padding: 5, color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsExtraBold, }}>Rs. {this.state.productTotalAmount}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Text style={{ padding: 5, flex: 1, color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsExtraBold, fontWeight: 'bold' }}>Charge 1</Text>
                                    <Text style={{ padding: 5, color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsExtraBold, }}>Rs. {Helper.charge1}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Text style={{ padding: 5, flex: 1, color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsExtraBold, fontWeight: 'bold' }}>Charge 2</Text>
                                    <Text style={{ padding: 5, color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsExtraBold, }}>Rs. {Helper.charge2}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Text style={{ padding: 5, flex: 1, color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsExtraBold, fontWeight: 'bold' }}>Total Amount</Text>
                                    <Text style={{ padding: 5, color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsExtraBold, }}>Rs. {Number(data.totalAmount) + Number(this.state.productTotalAmount) +(Number(Helper.charge1) + Number(Helper.charge2)) }</Text>
                                </View>

                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Text style={{ padding: 5, flex: 1, color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsExtraBold, fontWeight: 'bold' }}>Discount (coupon code:)</Text>
                                    <Text style={{ padding: 5, color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsExtraBold, }}>Rs.{this.state.coupondiscountAmount == 0 ? "0" : this.state.coupondiscountAmount}</Text>
                                </View>
                               { this.state.promoCode == "" &&  <TouchableOpacity onPress={() => this.getCouponList()} style={{width:150, borderRadius:20, marginTop:10, justifyContent:'center', backgroundColor : 'rgb(224, 220,217)'}}>
                                    <Text style={{ padding: 5,textAlign:'center', color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsExtraBold, fontWeight: 'bold' }}>APPLY PROMO CODE</Text>
                                </TouchableOpacity>
    }
                            </View>
                            <View style={{ marginBottom: 5, paddingHorizontal: 20, }}>



                                <View style={{ marginVertical: 15, }}>
                                    <View style={{ backgroundColor: Colors.warmGreyTwo, height: .5, width: '100%' }}></View>
                                </View>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Text style={{ padding: 5, flex: 1, color: Colors.black, fontSize: 14, fontFamily: fonts.PoppinsBold, fontWeight: 'bold' }}>Total Payable Amount</Text>
                                    <Text style={{ padding: 5, color: Colors.black, fontSize: 14, fontFamily: fonts.PoppinsExtraBold, }}>{this.state.totalAmount}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>

                                        <Text style={{
                                            fontFamily: fonts.PoppinsBold, marginRight: 5,
                                            fontSize: fonts.fontSize14, color: Colors.black,
                                        }}>You save Rs. {this.state.coupondiscountAmount == 0 ? "0" : this.state.coupondiscountAmount}</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>
               

               {this.state.promoCode == "" ? null : 
                    <View style={{ marginTop: 10 }}>
                        <View style={{
                            borderColor: '#FCFBFB', marginBottom: 5,
                            backgroundColor: Colors.white, borderWidth: 1,
                            elevation: 2, marginHorizontal: 20, borderRadius: 8
                        }}>
                            <View style={{ marginBottom: 5, paddingHorizontal: 20, }}>
                                <View style={{ flexDirection: 'row', flex: 1,alignItems:'center'}}>
                                    <Text style={{ padding: 5,  color: Colors.black, fontSize: 14, fontFamily: fonts.PoppinsBold, }}>{this.state.promoCode}</Text>
                                    <View style={{flex:1,}}>
                                    <Text style={{ width:144, color: Colors.black, height:25, borderRadius:20, fontSize: 12, borderWidth:0.5,paddingHorizontal:10,paddingVertical:5, backgroundColor : 'rgb(224, 220,217)', fontFamily: fonts.PoppinsRegular, }}>Applied Successfully</Text>
                                    </View>
                                    <TouchableOpacity onPress={()=> this.removeCoupon()}>
                               <Image source={images.Icon_close_circle_outline} style={{height:20,width:20}}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{
                                            fontFamily: fonts.PoppinsRegular, marginRight: 5,
                                            fontSize: fonts.fontSize14, color: Colors.black,
                                        }}>Rs.{this.state.coupondiscountAmount} discount value</Text>
                                
                                </View>
                            </View>

                        </View>
                    </View>
    }

                </ScrollView>

                <View style={{
                    borderTopWidth: 1, borderTopColor: '#00000010',
                    backgroundColor: Colors.white,
                    elevation: 3,
                    bottom: 0, width: '100%',
                    position: 'absolute', justifyContent: 'space-between',
                    flexDirection: 'row', height: 68, alignItems: 'center',
                    paddingHorizontal: 20
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <View style={{

                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                color: Colors.black, fontSize: fonts.fontSize20,
                                fontFamily: fonts.PoppinsBold, fontWeight: 'bold'
                            }}>Total Amount</Text>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                            <Image resizeMode={'contain'} source={images.rupe} style={{ height: 17, width: 17 }} />
                            <Text style={{ fontSize: fonts.fontSize17 , }}>{this.state.totalAmount}</Text>
                        </View>
                    </View>

                    <TouchableOpacity 
                    onPress={() => this.pay()} 
                    style={{ backgroundColor: Colors.black, height: 28, width: 90, borderRadius: 28 / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: Colors.white, fontSize: fonts.fontSize12, fontFamily: fonts.PoppinsRegular }}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }

    pay(){
        let couponData =  {
            discount_amount :  this.state.coupondiscountAmount,
            coupon_code :  this.state.promoCode
        }
        this.props.navigation.navigate('SelectPaymentMode', { 
            data: this.props.route.params?.data, 
            slotTime: this.props.route.params?.slotTime, 
            lastAmount: this.state.totalAmount , 
            selectedProductArr :this.props.route.params?.selectedProductArr ,
            couponData : couponData
        })
    }

    removeCoupon(){
        this.state.promoCode = "" 

       // this.state.totalAmount= this.props.route.params?.data?.data?.totalAmount 
       
       this.state.totalAmount = Number(this.state.totalAmount) + Number(this.state.coupondiscountAmount)
       this.state.coupondiscountAmount = ""
        this.setState({})
    }

    couponModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.couponModalVisible}>
                <View onPress={() => this.setState({ couponModalVisible: false })}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>

                    <View style={{ padding: 15, width: Dimensions.get('window').width - 0, backgroundColor: 'white', height: '80%', position: 'absolute', bottom: 0, borderTopEndRadius: 10, borderTopStartRadius: 10, marginHorizontal: 20 }}>

                        <Text style={{ fontFamily: fonts.PoppinsBold, fontSize: 16 }}>{"Apply Promo Code"}</Text>

                        <TouchableOpacity style={{ position: 'absolute', right: 10, top: 10 }} onPress={() => this.setState({ couponModalVisible: false })}>
                            <Image source={images.Icon_close_circle_outline} resizeMode={'contain'} style={{ height: 20, width: 20, }} />
                        </TouchableOpacity>

                        <View style={{ borderWidth: 1, borderColor: '#000', alignItems: 'center', flexDirection: 'row', marginTop: 20, borderRadius: 4 }}>
                            <TextInput
                                placeholder={'Enter promo code here'}
                                style={{ height: 40, flex: 1 }}
                                maxLength={40}
                                value={this.state.promoCode}
                                onChangeText={(promoCode) => this.setState({ promoCode: promoCode })}
                            />

                            <TouchableOpacity onPress={() => this.applyCode()} style={{ marginRight: 10 }}>
                                <Text style={{ fontSize: 14, fontFamily: fonts.PoppinsSemiBold, color: 'rgb(67,146,237)' }}>APPLY</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 10, marginBottom:'1%' , flex:1 }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.state.arrCoupon} // this.state.arrCoupon
                                renderItem={this.couponRender}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>

                    </View>
                </View>
            </Modal>
        )
    }
    couponRender = ({ item, index }) => {

        return <TouchableOpacity style={{ backgroundColor: 'rgb(248,248,248)', paddingVertical: 10, borderRadius: 5, marginTop: 10 }} onPress={() => this.applyCode(item?.coupon_code)}>

            <View style={{ paddingHorizontal: 10, }}>

                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <View style={{ flexDirection: 'row', }}>

                        <Image source={this.state.promoCode == item?.coupon_code ? images.radio_btn_selected : images.radio_btn_un_selected}
                            resizeMode={'contain'}
                            style={{ height: 20, width: 20, tintColor: Colors.warmGreyTwo }}
                        />
                        <Text style={{
                            fontFamily: fonts.PoppinsSemiBold, flex: 1,
                            fontSize: fonts.fontSize14, color: Colors.black, marginLeft: 10
                        }}>{item?.coupon_code}</Text>

                        {/* <TouchableOpacity onPress={() => this.deleteAddress(item)}>
                            <Image source={images.delete} resizeMode={'contain'} style={{ height: 20, width: 20, }} />
                        </TouchableOpacity> */}
                    </View>


                </View>

                <View style={{ marginLeft: 30, flexDirection: 'column' }}>
                    <Text style={{
                        color: Colors.warmGreyTwo, fontSize: fonts.fontSize10, fontFamily: fonts.PoppinsRegular,
                    }}>{item?.description}</Text>
                    {/* <TouchableOpacity>
              <Text style={{ color: 'rgb(67,146,237)', fontSize: fonts.fontSize10, fontFamily: fonts.PoppinsRegular,
                    }}>T&Cs apply</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </TouchableOpacity>
    }

    applyCode(code) {
        this.setState({ promoCode: code, couponModalVisible: false })
        let data = {
            user_id: Helper.userData.id,
            coupon_code: code ? code : this.state.promoCode,
            amount: this.state.totalAmount
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.couponApply, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
             console.log("arrCoupon ----------", response.data)
            if (response.status == true) {
                this.state.totalAmount = response.total_amount
                this.state.coupondiscountAmount = response.minus_amount
                this.setState({})
                // this.setState({ arrCoupon: response.data , couponModalVisible : true})
            } else {
                this.setState({promoCode :""})
                Helper.showToast(response.message)
            }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

};
