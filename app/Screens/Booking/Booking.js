import React from 'react';
import { Text, View, FlatList, TouchableOpacity, Alert, bookingComplete, StyleSheet, SafeAreaView, DeviceEventEmitter } from 'react-native';
import styles from './BookingStyles';
import Colors from '../../Assets/Colors';
import fonts from '../../Assets/fonts';
import AppHeader from '../../Comman/AppHeader';
import RNPickerSelect from '../../Comman/CommonPicker'
import ApiCallHelper from '../../config/ApiCallHelper'
import Constant from '../../config/Constant'
import Helper from '../../config/Helper'
import moment from 'moment';

export default class Booking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            arrBooking: [],
            serviceType: "",
            arrItem: [
                {
                    page: "All Booking",
                    title: 'All Booking',
                    type: '1',

                    value: ''
                },
                {
                    page: "Pending",
                    title: "Pending",
                    type: '2',

                    value: 'pending'
                },
                {
                    page: "Requested",
                    title: 'Requested',
                    type: '3',

                    value: 'requested'
                },
                {
                    page: "Assigned",
                    title: 'Assigned',
                    type: '4',

                    value: 'assigned'
                },
                {
                    page: "Confirmed",
                    title: 'Confirmed',
                    type: '5',

                    value: 'confirmed'
                },
                {
                    page: "Completed",
                    title: 'Completed',
                    type: '5',

                    value: 'completed'
                },
                {
                    page: "Cancelled",
                    title: 'Cancelled',
                    type: '5',

                    value: 'Cancelled'
                },
                
                {
                    page: "Closed",
                    title: 'Closed',
                    type: '5',

                    value: 'closed'
                },


            ],
            arrFilter: [
                { label: 'All Booking', value: '' },
                { label: 'Pending', value: 'pending' },
                { label: 'Requested', value: 'requested' },
                { label: 'Assigned', value: 'assigned' },
                { label: 'Confirmed', value: 'confirmed' },
                { label: 'Completed', value: 'completed' },
                { label: 'Closed', value: 'closed' },
            ],
            filterId: '',
            apiResponce: false,

        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'My Booking', borderBottomRadius: 0,
            bellIcon: false,
            settingsIcon: false,
            headerBg: false,
            hideLeftBackIcon: false,

        })
    }



    componentDidMount() {
        this.bookingComplete = DeviceEventEmitter.addListener("bookingComplete", (data) => {
            this.getBookings(this.state.filterId)
        })
        this.focusListener = this.props.navigation.addListener('focus', () => {
                this.getBookings(this.state.filterId)
           
        })
        this.getBookings(this.state.filterId)
    }




    cancelBooking(val) {
        let data = {
            booking_id: val.booking_id
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.cancelledBooking, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                this.getBookings(this.state.filterId)
            } else {

            }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    clickAction(value) {
        this.setState({ serviceType: value })

        this.getBookings(value)
    }


    getBookings(val) {
        this.setState({ filterId: val, arrBooking: [], serviceType: val })
        let data = {
            user_id: Helper.userData.id,
            type: val
        }
        console.log(data);
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.bookingList, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                this.setState({ arrBooking: response.data, })
            } else {

            }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    _renderUpComingItem = ({ item, index }) => {
        return (
            <View style={styles.history_view}>

                <TouchableOpacity onPress={() => { this.props.navigation.navigate('BookingDetails', { data: item }) }}>
                    <View style={styles.img_calender_location_list_view}>
                        <Text style={{ fontFamily: fonts.PoppinsExtraBold, color: Colors.black, fontSize: 13, fontWeight: 'bold' }}>Booking ID: </Text>
                        <Text style={{ fontSize: 12, color: 'gray' }}>{item.booking_id}</Text>
                    </View>
                    <View style={styles.img_calender_location_list_view}>
                        <Text style={{ fontFamily: fonts.PoppinsExtraBold, color: Colors.black, fontSize: 13, fontWeight: 'bold' }}>Booking Date: </Text>
                        <Text style={{ fontSize: 12, color: 'gray' }}>{moment(item.created_at).format("DD-MM-YYYY")}</Text>
                    </View>
                    <View style={styles.img_calender_location_list_view}>
                        <Text style={{ fontFamily: fonts.PoppinsExtraBold, color: Colors.black, fontSize: 13, fontWeight: 'bold' }}>Request Date: </Text>
                        <Text style={{ fontSize: 12, color: 'gray' }}>{moment(item.delivery_date).format("DD-MM-YYYY")}</Text>
                    </View>
                    {console.log("cancelled----", item)}
                    {item.status == "cancelled" ?
                        <View style={styles.img_calender_location_list_view}>
                            <Text style={{ fontFamily: fonts.PoppinsExtraBold, color: Colors.black, fontSize: 13, fontWeight: 'bold' }}>Cancelled Date: </Text>
                            <Text style={{ fontSize: 12, color: 'gray' }}>{item?.cancelled_date}</Text>
                        </View> : null}
                    {(item.status == "Cancelled" || item.status == "cancelled") &&
                        <View style={styles.img_calender_location_list_view}>
                            <Text style={{ fontFamily: fonts.PoppinsExtraBold, color: Colors.black, fontSize: 13, fontWeight: 'bold' }}>Cancelled By: </Text>

                            <Text style={{ flex: 1, fontSize: 12, color: item.status == "Cancelled" || item.status == "cancelled" ? "red" : 'gray' }}>{item.updated_by}</Text>

                        </View>
                    }
                    <View style={styles.img_calender_location_list_view}>
                        <Text style={{ fontFamily: fonts.PoppinsExtraBold, color: Colors.black, fontSize: 13, fontWeight: 'bold' }}>Status: </Text>
                        <Text style={{ flex: 1, fontSize: 12, color: item.status == "Cancelled" || item.status == "cancelled" ? "red" : 'gray' }}>{item.status}</Text>
                        {item.status == "completed" || item.status == "cancelled" || item.status == "Completed" || item.status == "Cancelled" ? null :
                            <TouchableOpacity onPress={() => this.CancelAlert(item)} style={{ backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingHorizontal: 10 }}>
                                <Text style={{ color: Colors.white, fontSize: 12, fontFamily: fonts.PoppinsSemiBold, }}>Cancel</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </TouchableOpacity>
            </View>
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

    _renderUpComingItems = ({ item, index }) => {
        // console.log(item);
        return (
            <View style={{ height: 30, marginLeft: index == 0 ? 0 : 10 }}>
                <TouchableOpacity onPress={() => { this.clickAction(item.value) }}>
                    <View style={{ flexDirection: 'row', borderWidth: this.state.serviceType == item.value ? 0 : 1, borderColor: this.state.serviceType == item.value ? "red" : Colors.primary, backgroundColor: this.state.serviceType == item.value ? "black" : 'white', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 5, alignItems: 'center' }}>
                        <Text style={{ fontFamily: fonts.PoppinsExtraBold, color: this.state.serviceType == item.value ? 'white' : 'black', fontSize: 12, fontWeight: 'bold' }}>{item.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }


    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>

                {/* <View style={{ backgroundColor: '#F4EDED', marginTop: 10, marginHorizontal: 15, paddingHorizontal: 5 }}>
                    <RNPickerSelect
                        //label={LanguagesIndex.translate('LanguagePreference')}
                        items={this.state.arrFilter}
                        placeHolder={{}}

                        onValueChange={(value) => { this.getBookings(value) }}
                        selectValue={this.state.filterId}
                        useNativeAndroidPickerStyle={false}
                        style={pickerSelectStyles}
                    />
                </View> */}

                <View style={{ marginTop: 10, marginBottom: 20, marginHorizontal: 10 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.arrItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={this._renderUpComingItems}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    />



                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.arrBooking}
                        renderItem={this._renderUpComingItem}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    />


                </View>


            </SafeAreaView>
        )
    }

};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        height: 40,
        color: '#000',
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10,
        fontFamily: fonts.PoppinsExtraBold,
        marginLeft: 10
    },
    inputAndroid: {
        fontSize: 14,
        height: 40,
        color: '#000',
        marginRight: 20,
        marginLeft: 8,
        marginBottom: 10,
        fontFamily: fonts.PoppinsExtraBold
    },
});
