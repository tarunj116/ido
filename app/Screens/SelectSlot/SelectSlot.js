// AppHeader({ ...this.props.navigation, leftTitle: 'Account',
// hideLeftBackIcon: false, })
import React from 'react';
import { Text, View, ScrollView, Share, FlatList, StyleSheet, Image, TouchableOpacity, SafeAreaView, } from 'react-native';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import IconInput from '../../Comman/GInput';
import KeyboardScroll from '../../Comman/KeyboardScroll';
import AppHeader from '../../Comman/AppHeader';
import fonts from '../../Assets/fonts';
import ApiCallHelper from '../../config/ApiCallHelper';
import Constant from '../../config/Constant';
import Helper from '../../config/Helper'
import moment from 'moment';

export default class SelectSlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.route.params?.data,
            arrMonthDayItem: [],
            arrTime: [],
            date: moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD"),
            selectedDate: moment(new Date(), "YYYY-MM-DD").format("DD MMM")
        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Select Slot',
            bellIcon: false, settingsIcon: false, profileIcon: false,
            hideLeftBackIcon: false,

        })
        //  alert(moment(new Date(), "YYYY-MM-DD").format("DD MMM"))

    }

    selectSlot(val) {
        let data = {
            date: this.state.selectedDate,
            time: val

        }
        // this.props.navigation.navigate('PaymentReview',{data : this.props.route.params?.data , slotTime : data})
        this.props.navigation.navigate('PaymentReview', { data: this.props.route.params?.data , slotTime :data, selectedProductArr:"" })

       // this.props.navigation.navigate('AddProduct', { data: this.props.route.params?.data, slotTime: data })
    }

    componentDidMount() {
        this.getDaysList()
    }

    getDaysList() {
        var data = {}
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.daysSlotsList, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                this.setState({ arrMonthDayItem: response.data })

            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    _renderMonthDayItem = ({ item, index }) => {
        // console.log(item);
        return (
            <View style={{ marginVertical: 5, marginHorizontal: 8 }}>
                <TouchableOpacity onPress={() => this.setState({ selectedDate: item.date })} style={{
                    backgroundColor: this.state.selectedDate === item.date ? Colors.black : Colors.white,
                    paddingVertical: 8,
                    paddingHorizontal: 20, borderRadius: 18, borderWidth: 1, borderColor: Colors.black
                }}>
                    <Text style={{
                        color: this.state.selectedDate === item.date ? Colors.white : Colors.black, fontSize: 12, fontWeight: 'bold',
                        fontFamily: fonts.PoppinsBold
                    }}>{moment(item.date, "YYYY-MM-DD").format("DD MMM")}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    getTimeSlots(date) {
        this.setState({ selectedDate: date, date: date })
        this.getTimeList(date)
    }


    getTimeList(val) {
        var data = {
            date: val
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.timeSlotsList, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                this.setState({ arrTime: response.data })

            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    _renderMonthDayItem = ({ item, index }) => {
        // console.log(item);
        return (
            <View style={{ marginVertical: 5, marginHorizontal: 8 }}>
                <TouchableOpacity onPress={() => this.getTimeSlots(item.date)} style={{
                    backgroundColor: this.state.selectedDate === item.date ? Colors.black : Colors.white,
                    paddingVertical: 8,
                    paddingHorizontal: 20, borderRadius: 18, borderWidth: 1, borderColor: Colors.black
                }}>
                    <Text style={{
                        color: this.state.selectedDate === item.date ? Colors.white : Colors.black, fontSize: 12, fontWeight: 'bold',
                        fontFamily: fonts.PoppinsBold
                    }}>{moment(item.date, "YYYY-MM-DD").format("DD MMM")}</Text>
                </TouchableOpacity>
            </View>
        )
    }


    _renderTimeItem = ({ item, index }) => {
        // console.log(item);
        return (
            <View style={styles.timeView}>
                <TouchableOpacity onPress={() => this.selectSlot(item.date)} style={styles.touchCss}>
                    <Text style={styles.timeCss}>{item.date}</Text>
                </TouchableOpacity>
            </View>
        )
    }




    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', }}>
                <View style={{ marginTop: 10, marginHorizontal: 5, }}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={this.state.arrMonthDayItem}
                        renderItem={this._renderMonthDayItem}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

                {this.state.arrTime.length <= 0 ? 
                <View style={{flex:1,  justifyContent:'center', alignItems:'center'}}>
                     <Text style={{marginBottom : 100}}>Select time slot</Text>
                    </View>
               

                :
                    <>
                        <View style={{ marginTop: 10, marginHorizontal: 15, alignItems: 'center' }}>
                            <Text style={styles.avlTime}>AVAILABLE TIME SLOTS</Text>
                        </View>

                        <View style={styles.listBorder}>
                            <FlatList

                                numColumns={2}
                                data={this.state.arrTime}
                                renderItem={this._renderTimeItem}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </>
                }
            </View>
        )
    }

};

const styles = StyleSheet.create({
    safe_area_view: {
        flex: 1,
        // backgroundColor: Colors.white
    },
    timeView: {
        flex: 1,
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5
    },
    touchCss: {
        justifyContent: 'center', alignItems: 'center',
        borderColor: '#FCFBFB',
        backgroundColor: Colors.white,
        borderWidth: 0.5,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 4,
        elevation: 1,
        // paddingVertical:15,
        // paddingHorizontal:10
    },
    timeCss: {
        color: Colors.black, fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: fonts.PoppinsBold
    },
    listBorder: {
        marginTop: 20, marginHorizontal: 5, marginHorizontal: 10, borderRadius: 15,
        borderWidth: 0.5, borderColor: '#C5C5C5'
    },
    avlTime: { color: Colors.black, fontSize: 15, fontWeight: 'bold', fontFamily: fonts.PoppinsBold }

});





