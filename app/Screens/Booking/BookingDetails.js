import React from 'react';
import { Text, View, FlatList, Image, ScrollView, Linking, Alert, TouchableOpacity, StyleSheet, SafeAreaView, DeviceEventEmitter, } from 'react-native';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import AppHeader from '../../Comman/AppHeader';
import ApiCallHelper from '../../config/ApiCallHelper';
import Constant from '../../config/Constant';
import Helper from '../../config/Helper'
import fonts from '../../Assets/fonts';
import moment from 'moment'
var cartData = []

export default class BookingDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.route.params?.data,
            arrBooking: [],
            bookingDetaild: '',
            arrBooking_details: [],
            addonproduct_details: []
        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Booking Details', borderBottomRadius: 0,
            bellIcon: false,
            settingsIcon: false,
            headerBg: false,
            hideLeftBackIcon: false,
            booking: false,
            giveRating: () => this.giveRating(),
            //settingIconClick: () => this.settingIconClick()
        })
    }

    componentDidMount() {
        this.rating = DeviceEventEmitter.addListener("Rating", (data) => {
            this.getBiikingDetails()
        })
        this.getBiikingDetails()

    }

    componentWillUnmount() {
        this.rating.remove()
    }

    giveRating() {
        this.props.navigation.navigate('RatingReview', { bookingData: this.state.bookingDetaild })
    }

    getBiikingDetails() {
        var data = {}
        data.booking_id = this.props.route.params?.data?.booking_id
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.bookingDetails, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("------services services", response.data)
            if (response.status == true) {
                this.setState({ bookingDetaild: response.data, arrBooking_details: response.data.booking_details, addonproduct_details: response.data.addonproduct_details })

                AppHeader({
                    ...this.props.navigation, leftTitle: 'Booking Details', borderBottomRadius: 0,
                    bellIcon: false,
                    settingsIcon: false,
                    headerBg: false,
                    hideLeftBackIcon: false,
                    booking: response.data.status == "completed" && response.data.is_ratings == "0" ? true : false,
                    giveRating: () => this.giveRating(),
                    //settingIconClick: () => this.settingIconClick()
                })

            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }


    providerCall(phoneNumber) {
        Linking.openURL(`tel:${phoneNumber}`)

    }
    render() {
        let data = this.state.bookingDetaild
        console.log("data--------------", data);
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView>
                    <View style={{ marginHorizontal: 15, marginBottom: 15 }}>

                        <View style={{ flex: 1, backgroundColor: Colors.white, }}>
                            <View style={styles.bookingView}>
                                <Text style={styles.bookingtxt}>Booking id: {data.booking_id}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 10, backgroundColor: Colors.white, }}>
                            <View style={styles.dateCss}>
                                <Text style={styles.btxtCss}>Booking Date: <Text style={{ fontWeight: 'normal', marginLeft: 10 }}>{moment(data?.created_at).format('DD-MM-YYYY')}</Text></Text>
                                <Text style={styles.btxtCss}>Request date: <Text style={{ fontWeight: 'normal', marginLeft: 10 }}>{moment(data?.delivery_date).format("DD-MM-YYYY")}</Text></Text>
                                <Text style={styles.btxtCss}>Time Slot: <Text style={{ fontWeight: 'normal', marginLeft: 10 }}>{data?.delivery_time}</Text></Text>

                                <Text style={styles.btxtCss}>Status : <Text style={{ fontWeight: 'normal' }}>{data?.status}</Text></Text>
                            </View>
                        </View>
                        {data?.provider_details == null ? null
                            :
                            <>
                                <Text style={[styles.btxtCss, { marginTop: 10 }]}>Service Provider Details</Text>
                                <View style={{ marginTop: 10, backgroundColor: Colors.white, }}>
                                    <View style={[styles.dateCss, { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', }]}>
                                        <Image source={{ uri: data?.provider_details?.profile_image }} style={{ height: 70, width: 70 }}></Image>
                                        <View style={{ flexDirection: 'column', marginRight: 80, marginHorizontal: 10 }}>
                                            <Text numberOfLines={1} style={styles.btxtCss}>{data?.provider_details?.name}</Text>
                                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                <Image resizeMode={'contain'} source={images.star} style={{ height: 15, width: 15 }}></Image>
                                                <Text style={{ fontSize: 12, marginLeft: 10, alignSelf: 'center' }}>{data?.provider_details?.avg_ratings} {'('} {data?.provider_details?.total_ratings} ratings)</Text>
                                            </View>
                                            {moment().format('YYYY-MM-DD') == data?.delivery_date && 
                                                <TouchableOpacity onPress={() => this.providerCall(data?.provider_details?.mobile_no)} style={{ flexDirection: 'row', marginTop: 5 }}>
                                                    <Image resizeMode={'contain'} source={images.call} style={{ height: 15, width: 15 }}></Image>
                                                    <Text style={{ fontSize: 12, marginLeft: 10, alignSelf: 'center' }}>Call Now</Text>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                    </View>
                                </View>
                            </>
                        }

                        {this.state.addonproduct_details.length <= 0 ? null :
                            <>
                                <Text style={[styles.btxtCss, { marginTop: 10 }]}>Add On Product Details</Text>

                                <View style={{ marginTop: 10, backgroundColor: Colors.white, }}>
                                    <View style={[styles.dateCss, { justifyContent: 'flex-start', }]}>
                                        {this.state.addonproduct_details.map((item, index) => {
                                            return <View style={{ marginTop: 10 }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <Text style={{
                                                        color: Colors.black, fontSize: 13, fontWeight: 'bold', fontFamily: fonts.PoppinsBold
                                                    }}>{item.product_name}</Text>
                                                    <Text style={{ color: Colors.black, fontSize: 13, fontFamily: fonts.PoppinsRegular }}>Rs. {Number(item.price) * Number(item.quantity)}</Text>
                                                </View>
                                                <Text style={{ color: Colors.black, fontSize: 13, fontFamily: fonts.PoppinsRegular }}>Rs. {item.price} x {item.quantity}</Text>
                                            </View>
                                        })}
                                    </View>
                                </View>
                            </>
                        }

                        <Text style={[styles.btxtCss, { marginTop: 10 }]}>Add On Service Details</Text>

                        <View style={{ marginTop: 10, backgroundColor: Colors.white, }}>
                            {this.state.arrBooking_details.length <= 0 || this.state.arrBooking_details == [] ? null :
                                <View style={[styles.dateCss, { justifyContent: 'flex-start', }]}>
                                    {this.state.arrBooking_details.map((item, index) => {
                                        return <View style={{ marginTop: 10 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{
                                                    color: Colors.black, fontSize: 13, fontWeight: 'bold', fontFamily: fonts.PoppinsBold
                                                }}>{item.service_name}</Text>
                                                <Text style={{ color: Colors.black, fontSize: 13, fontFamily: fonts.PoppinsRegular }}>Rs. {Number(item.price) * Number(item.quantity)}</Text>
                                            </View>
                                            <Text style={{ color: Colors.black, fontSize: 13, fontFamily: fonts.PoppinsRegular }}>Rs. {item.price} x {item.quantity}</Text>
                                        </View>
                                    })}
                                </View>
                            }
                        </View>

                        <View style={{ marginTop: 10, backgroundColor: Colors.white, }}>
                            <View style={[styles.dateCss, { justifyContent: 'flex-start', }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ flex: 1, fontSize: 13, fontWeight: "bold" }}>Service Charge</Text>
                                    <Text style={{}}>Rs {data?.total_amount}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <Text style={{ flex: 1, fontSize: 13, fontWeight: "bold" }}>Product Amount</Text>
                                    <Text style={{}}>Rs {data?.product_total_amt}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <Text style={{ flex: 1, fontSize: 13, fontWeight: "bold" }}>Charge 1</Text>
                                    <Text style={{}}>Rs. {data?.charge_1}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <Text style={{ flex: 1, fontSize: 13, fontWeight: "bold" }}>Charge 2</Text>
                                    <Text style={{}}>Rs. {data?.charge_2}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <Text style={{ flex: 1, fontSize: 13, fontWeight: "bold" }}>Discount ({data?.coupon_code})</Text>
                                    <Text style={{}}>Rs. {data?.discount}</Text>
                                </View>

                                {/* <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <Text style={{ flex: 1, fontSize: 13, fontWeight: "bold" }}>Add On Service Charge</Text>
                                    <Text style={{}}>Rs 0</Text>
                                </View> */}

                                <View style={{ marginVertical: 10, height: 1, backgroundColor: '#c5c5c5' }} />

                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <Text style={{ flex: 1, fontSize: 15, fontWeight: "bold" }}>Total</Text>
                                    <Text style={{}}>Rs. {Number(data?.total_amount) + Number(data?.product_total_amt) + (Number(data?.charge_1) + (Number(data?.charge_2)))}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <Text style={{ flex: 1, fontSize: 13, fontWeight: "bold" }}>Payment: {data?.payment_type}</Text>
                                    <Text style={{}}>You have Rs. {data?.total_payble_amt}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {data.status == "completed" || data.status == "cancelled" || data.status == "Completed" || data.status == "Cancelled" ? null :
                        <TouchableOpacity onPress={() => this.CancelAlert(data)} style={{ backgroundColor: 'black', marginHorizontal: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingHorizontal: 10 }}>
                            <Text style={{ color: Colors.white, fontSize: 12, fontFamily: fonts.PoppinsSemiBold, paddingVertical: 10 }}>Cancel</Text>
                        </TouchableOpacity>
                    }

                    {data?.is_raiseissue == 1 ?
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('ContactUs', { title: "Raise issue", data: data }) }} style={{ alignSelf: 'center', backgroundColor: 'black', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, marginBottom: 10 }}>
                            <Text style={{ color: "white" }}>Raise issue</Text>
                        </TouchableOpacity>
                        : null}

                </ScrollView>
            </SafeAreaView>
        )
    }
    CancelAlert(item) {
        Alert.alert(
            "5Ayat",
            "Are you sure want to Cancel Booking ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.cancelBooking(item) }
            ]
        );
    }

    cancelBooking(val) {
        let data = {
            booking_id: val.booking_id
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.cancelledBooking, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                DeviceEventEmitter.emit("bookingComplete", "done")
                this.props.navigation.goBack()
                //this.getBookings(this.state.filterId)
            } else {

            }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }


}

const styles = StyleSheet.create({
    bookingView: {
        elevation: 2, borderRadius: 10, borderWidth: 0.01, flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 15
    }, bookingtxt: { fontSize: 15, fontFamily: fonts.PoppinsBold },
    dateCss: {
        elevation: 2, borderRadius: 10, borderWidth: 0.01, flex: 1, justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 10
    },
    btxtCss: { fontSize: 13, fontWeight: "bold", color: '#000', fontFamily: fonts.PoppinsRegular }
})