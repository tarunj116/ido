import React from 'react';
import { Text, View, FlatList, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, } from 'react-native';
import Colors from '../Assets/Colors';
import fonts from '../Assets/fonts';
import { images } from '../Assets/imagesUrl';
import AppHeader from '../Comman/AppHeader';
import ApiCallHelper from '../config/ApiCallHelper';
import Constant from '../config/Constant';
import Helper from '../config/Helper'

// var cartData = []
// var Realm = require('realm');

// let realm ;
export default class CategoryDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category_id: this.props.route.params?.data?.category_id,
            subcategory_id: this.props.route.params?.data?.id,
            title: this.props.route.params?.data?.title,
            arrServices: [],
            index: 0,
            arrRating: [],
            apiResponse: false
        }
        AppHeader({
            ...this.props.navigation, leftTitle: this.state.title, borderBottomRadius: 0,
            bellIcon: false,
            settingsIcon: false,
            headerBg: false,
            hideLeftBackIcon: false,
            CartIcon :true,
            tintColor:"black",
            cartIconClick: () => this.cartIconClick(),
        })
    }

    cartIconClick(){
        this.props.navigation.navigate('AddService')
    }
    componentDidMount() {
        this.getServices()
    }

    gotToAddServiceDetail(id) {
        var data = {}
        data.product_id = id,
            data.user_id = Helper.userData.id
        //Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.addToCart, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("------services services", response.data)
            if (response.status == true) {
                this.getServices()
                Helper.showToast(response.message)
                // this.setState({ arrServices: response.data, })

            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })

    }

    getServices() {
        var data = {}
        data.category_id = this.state.category_id,
            data.subcategory_id = this.state.subcategory_id
        data.user_id = Helper.userData.id
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.services, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                this.setState({ arrServices: response.data, apiResponse: true })
            } else {
                this.setState({ apiResponse: false })

            }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }



    listionDetails(item) {
        this.props.navigation.navigate('ListingDetails', { data: item })
    }

    _addQty(id) {
        this.incrementDecrement(id, "1")
    }

    DecreQty(id,) {
        this.incrementDecrement(id, "2")
    }

    incrementDecrement(id, type) {
        var data = {}
        data.product_id = id,
            data.user_id = Helper.userData.id
        data.type = type
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.quantityCounter, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            // console.log("------services services", response.data)
            if (response.status == true) {
                this.getServices()
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    _renderUpComingItem = ({ item, index }) => {
        // console.log("-------------------", item)
        return (
            <View style={styles.listView}>

                <TouchableOpacity onPress={() => this.listionDetails(item)} style={{ paddingHorizontal: 10, marginTop: 3, alignItems: 'center', }} >
                    <View style={{ flexDirection: 'row', paddingVertical: 10, width: '100%' }}>
                        <Image resizeMode={'stretch'} source={{ uri: item.image }} style={{ height: 60, width: 60 }} />
                        <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 4 }}>
                                <Text style={{ fontFamily: fonts.PoppinsBold, fontSize: 15, marginRight: item.quantity == 0 ? '25%' : '32%', }}>{item.title}</Text>
                                {item.quantity == 0 ?
                                    <TouchableOpacity onPress={() => { this.gotToAddServiceDetail(item.id) }} style={{ position: 'absolute', right: 2 }}>
                                        <Text style={{ paddingHorizontal: 15, borderWidth: 1, fontSize: 12, borderRadius: 16, paddingVertical: 2, }}>Add</Text>
                                    </TouchableOpacity> :

                                    <View style={{ position: 'absolute', right: 2, alignItems: 'center', borderRadius: 16, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 2, flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => this.DecreQty(item.id)}>
                                            <Image source={images.minus} style={{ height: 16, width: 16 }} />
                                        </TouchableOpacity>

                                        <Text style={{ marginHorizontal: 5, fontSize: 14 }} >{item.quantity}</Text>

                                        <TouchableOpacity onPress={() => this._addQty(item.id)}>
                                            <Image source={images.plus} style={{ height: 16, width: 16 }} />
                                        </TouchableOpacity>
                                    </View>

                                }
                            </View>

                            <View style={{ flexDirection: 'row',  alignItems: 'center',  }}>
                                <Image resizeMode={'contain'} source={images.rupe} style={{ height: 17, width: 17 }} />
                                <Text style={{ fontSize: 18, marginTop: 5, fontFamily: fonts.PoppinsRegular }}>{item.price}</Text>

                                {item.ratings == "0" ? null :
                                    <View style={{ position: 'absolute', flexDirection: 'row', right: 2, right: 2 }}>
                                        <Image resizeMode={'contain'} source={images.star} style={{ height: 15, width: 15 }} />
                                        <Text style={{ fontSize: 10, color: '#555555', fontFamily: fonts.PoppinsSemiBold, marginLeft: 5 }}>{item.avg_rating} {'('}{item.ratings} ratings)</Text>
                                    </View>
                                }
                               

                            </View>
                        </View>

                    </View>
                </TouchableOpacity>


            </View>
        )
    }




    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: '#fff'
            }}>
                <ScrollView>
                    <View style={{ marginHorizontal: 15, backgroundColor: Colors.white, }} key="1">

                        <Image resizeMode={"stretch"} source={this.props.route.params.data.banner_image ? { uri: this.props.route.params.data.banner_image } : images.test3} style={{ height: 180, width: '100%' }}></Image>
                        <View style={{ marginTop: 10, marginBottom: 50 }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.state.arrServices}
                                renderItem={this._renderUpComingItem}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                </ScrollView>
                {this.state.apiResponse == false ? null : (this.state.arrServices[0]?.quantity == 0) ? null :
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddService')} style={{ position: 'absolute', bottom: 0, backgroundColor: 'black', height: 50, width: '100%', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>BOOK NOW</Text>
                    </TouchableOpacity>
                }
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    listView: {
        borderWidth: 0.5,
        borderRadius: 10,
        marginHorizontal: 2,
        marginBottom: 10,
        borderColor: '#FCFBFB',
        backgroundColor: Colors.white,
        elevation: 3,
        marginTop: 2
    }
})