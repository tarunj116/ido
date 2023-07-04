import React from 'react';
import { Text, View, ScrollView, FlatList, Image, TouchableOpacity, SafeAreaView, } from 'react-native';
import styles from './AddServiceStyles';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import ViewPager from '@react-native-community/viewpager';
import AppHeader from '../../Comman/AppHeader';
import ApiCallHelper from '../../config/ApiCallHelper';
import Constant from '../../config/Constant';
import Helper from '../../config/Helper'

export default class AddService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            qty: 0,
            total_amount: 0,
            arrService: [],

        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Add Service', borderBottomRadius: 0,
            bellIcon: false,
            settingsIcon: false,
            headerBg: false,
            hideLeftBackIcon: false,
            bellIconClick: () => this.bellIconClick(),
            settingIconClick: () => this.settingIconClick()
        })
    }

    componentDidMount() {

        this.getCartList()
        this.getCharge()
    }

    settingIconClick() {
        this.props.navigation.navigate('SettingsScreen')
    }

    bellIconClick() {
        this.props.navigation.navigate('NotificationsScreen')
    }
    getCartList() {
        var data = {}
       // data.product_id = id,
        data.user_id = Helper.userData.id
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.cartLists, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("------services services", response.data)
            if (response.status == true) {
                let data = response?.data
                this.setState({ arrService: data })
                data.map((item, index) => {
                this.setState({ total_amount: Number(this.state.total_amount) + Number(item.service_details.price) * Number(item.quantity) })
                })
               // Helper.showToast(response.message)
             //   this.props.navigation.navigate('AddService')
               // this.setState({ arrServices: response.data, })
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }


    gotToSelectAddress() {
       
        let data = {
            totalAmount: this.state.total_amount,
            arrCount: this.state.arrService.length,
            arrService: this.state.arrService,
        }
        this.props.navigation.navigate('SelectAddress', { data: data })
       // this.props.navigation.navigate('BookingReview', { data: data })
        // this.props.navigation.navigate('SelectAddress')
    }

    _addQty(index, pr) {
        var data = this.state.arrService;
        data[index].quantity = Number(data[index].quantity)  + 1;
        // data[index].price = pr * data[index].quantity;
        // this.setState({quntity:data});
        this.setState({ total_amount: Number(this.state.total_amount) + Number(data[index].service_details.price) });
        console.log("qqqqqqqqqqqqqqqqq", data[index].quantity)
        this.incrementDecrement(data[index].service_details.id,"1")
    }

    DecreQty(index, pr) {
        var data = this.state.arrService;
        if (data[index].quantity == 0) {

        return;
        } else {
            data[index].quantity = Number(data[index].quantity) - 1;
            //  data[index].price = data[index].price -  pr;
            //  this.setState({quntity:data});
            this.setState({ total_amount: Number(this.state.total_amount) - Number(data[index].service_details.price) });
            // this.addCart( data[index].product_id, data[index].quantity , data[index].price);
            this.incrementDecrement(data[index].service_details.id, "2")
        }
        if (data[index].quantity == 0) {
            var deletedItem = this.state.arrService.splice(index, 1);
            //  this.setState({arrService : deletedItem})
            console.log("--------------------------", deletedItem)
        }
    }

    getCharge() {
        var data = {}
        // Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.charges, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("------services services", response.data)
            if (response.status == true) {
               Helper.charge1 = response.charge_1
               Helper.charge2 = response.charge_2
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }


    incrementDecrement(id,type) {
        var data = {}
        data.product_id = id,
        data.user_id = Helper.userData.id
        data.type = type
        // Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.quantityCounter, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("------services services", response.data)
            if (response.status == true) {
               // Helper.showToast(response.message)
               // this.props.navigation.navigate('AddService')
               // this.setState({ arrServices: response.data, })
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    _renderUpComingItem = ({ item, index }) => {
        console.log("rating---------------", item);
        return (
            <View style={[styles.history_view, { paddingHorizontal: 10, }]}>

                <View style={{ flexDirection: 'row',flex:1, paddingVertical: 10, width: '100%' }}>
                    <Image resizeMode={'cover'} source={{ uri: item.service_details.image }} style={{ height: 60, width: 60 }} />
                   
                    <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10 }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                          
                            <Text style={{ fontFamily:fonts.PoppinsBold, fontSize: 15, marginRight:item.quantity == 0? '25%' :  '32%',}}>{item.service_details.title}</Text>

                            <View style={{ position: 'absolute', right: 2, alignItems: 'center', borderRadius: 16, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 2, flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.DecreQty(index, item.service_details.price)}>
                                    <Image source={images.minus} style={{ height: 16, width: 16 }} />
                                </TouchableOpacity>

                                <Text style={{ marginHorizontal: 5, fontSize: 14 }} >{item.quantity}</Text>

                                <TouchableOpacity onPress={() => this._addQty(index, item.service_details.price)}>
                                    <Image source={images.plus} style={{ height: 16, width: 16 }} />
                                </TouchableOpacity>
                            </View>

                             {/* <TouchableOpacity style={{ }}>
                                    <Image source={images.addservice} resizeMode={'contain'} style={{ height: 28, width: 72 }} />
                                </TouchableOpacity>  */}

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                            <Image resizeMode={'contain'} source={images.rupe} style={{ height: 17, width: 17 }} />
                            <Text style={{ fontSize: 18,marginTop:5, fontFamily:fonts.PoppinsRegular, }}>{item.service_details.price}</Text>

                            {item?.service_details?.ratings == "0" ? null :
                                    <View style={{ position: 'absolute', flexDirection: 'row', right: 2, right: 2 }}>
                                        <Image resizeMode={'contain'} source={images.star} style={{ height: 15, width: 15 }} />
                                        <Text style={{ fontSize: 10, color: '#555555',fontFamily:fonts.PoppinsSemiBold, marginLeft: 5 }}>{item?.service_details?.avg_rating} {'('}{item?.service_details?.ratings} ratings)</Text>
                                    </View>
                                }
                        </View>
                    </View>
               
                </View>
            </View>
        )
    }




    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>
                <ScrollView>
                    <View style={{ marginHorizontal: 15, flexDirection: 'column', backgroundColor: Colors.white, }} key="1">
                  {/* <Image resizeMode={'contain'} source={{}} style={{ height: 180, width: '100%' }}></Image> */}
                        <View style={{ marginTop: 20, marginBottom: 70 }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.state.arrService}
                                renderItem={this._renderUpComingItem}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={{
                    borderTopWidth: 1, borderTopColor: '#00000010',
                    backgroundColor: Colors.white,
                    bottom: 0, width: '100%',
                    position: 'absolute', justifyContent: 'space-between',
                    flexDirection: 'row', height: 68, alignItems: 'center', paddingHorizontal: 20
                }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <View style={{
                            backgroundColor: '#F8EFEF', width: 26, height: 26,
                            borderRadius: 26 / 2, borderWidth: 1,
                            borderColor: '#CBC5C5', justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                color: Colors.black, fontSize: fonts.fontSize10, fontFamily: fonts.PoppinsRegular
                            }}>{this.state.arrService.length}</Text>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                            <Image resizeMode={'contain'} source={images.rupe} style={{ height: 17, width: 17 }} />
                            <Text style={{ fontSize: 18, fontFamily:fonts.PoppinsRegular, marginTop:5 }}>{this.state.total_amount}</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => this.gotToSelectAddress()} style={{ backgroundColor: Colors.black, height: 28, width: 73, borderRadius: 28 / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: Colors.white,fontSize: 12,
                            fontFamily: fonts.PoppinsSemiBold }}>Next</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        )
    }

};
