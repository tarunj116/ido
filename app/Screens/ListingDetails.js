import React from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../Assets/Colors';
import { images } from '../Assets/imagesUrl';
import AppHeader from '../Comman/AppHeader';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ApiCallHelper from '../config/ApiCallHelper';
import Constant from '../config/Constant';
import Helper from '../config/Helper'
import fonts from '../Assets/fonts';

export default class ListingDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            serviceData: "",
            arrRating: [],
            arrService: [1, 2, 3],
            serviceId: this.props.route.params?.data?.id,
            apiResponse: false

        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Listing Details', borderBottomRadius: 0,
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


    getServices() {
        var data = {}
        data.service_id = this.state.serviceId,
            data.user_id = Helper.userData.id
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.serviceDetails, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("------services services", response.data)
            if (response.status == true) {
                this.setState({ serviceData: response.data, arrRating: response.data?.ratingsarr, apiResponse: true })

            } else {
                this.setState({ apiResponse: false })
            }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    _renderUpComingItem = ({ item, index }) => {
        return (

            <View style={{
                marginBottom: 10, borderColor: '#FCFBFB', backgroundColor: Colors.white,
            }}>
                <View style={{ height: index == 0 ? 0 : 1, backgroundColor: '#C5C5C5' }}></View>
                <TouchableOpacity style={{ paddingHorizontal: 10, marginTop: 3, alignItems: 'center', }} onPress={() => { }}>
                    <View style={{ flexDirection: 'row', paddingVertical: 10, width: '100%' }}>
                        <View style={{ flexDirection: 'column', flex: 1, }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                <Text style={{ fontFamily:fonts.PoppinsSemiBold, fontSize: 13 }}>{item.title}</Text>
                                <View style={{ position: 'absolute', paddingVertical: 2, right: 2 }}>

                                    <AirbnbRating
                                        showRating={false}
                                        selectedColor={'#FDCC0D'}
                                        count={5}
                                        //  onFinishRating={this.ratingCompleted}
                                        defaultRating={Number(item.rating)}
                                        isDisabled={true}
                                        size={10} />
                                </View>
                            </View>
                            <Text style={{ fontSize: 12, fontFamily:fonts.PoppinsRegular }}>{item.description}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
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
                Helper.showToast(response.message)
                this.getServices()
                //  this.props.navigation.navigate('AddService')
                // this.setState({ arrServices: response.data, })
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
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
        // Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.quantityCounter, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("------services services", response.data)
            if (response.status == true) {
                this.getServices()
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    render() {
        let data = this.state.serviceData
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView>
                    <View style={{ marginHorizontal: 15, backgroundColor: Colors.white, }} key="1">

                        <Image resizeMode={'stretch'} source={{ uri: data.banner_image }} style={{ height: 180, width: '100%' }}></Image>

                        <View style={{
                            borderWidth: 0.5, borderRadius: 10, marginHorizontal: 2,
                            marginBottom: 10, borderColor: '#FCFBFB', backgroundColor: Colors.white, elevation: 3, marginTop: 10
                        }}>
                            <View style={{ paddingHorizontal: 10, marginTop: 3, alignItems: 'center', }} onPress={() => { }}>
                                <View style={{ flexDirection: 'row', paddingVertical: 10, width: '100%' }}>
                                    {/* <Image resizeMode={'cover'} source={{ uri: data.image }} style={{ height: 60, width: 60 }} /> */}
                                    <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10 }}>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                            <Text style={{fontSize: 15,fontFamily:fonts.PoppinsBold, marginRight:data.quantity == 0? '25%' :  '32%', }}>{data.title}</Text>
                                            {data.quantity == 0 ?
                                                <TouchableOpacity onPress={() => { this.gotToAddServiceDetail(data.id) }} style={{ position: 'absolute', right: 2,  }}>
                                                    <Text style={{ paddingHorizontal: 15, borderWidth: 1,backgroundColor:'black', color:'white', fontSize: 12, borderRadius: 16, paddingVertical: 4, }}>Add</Text>
                                                </TouchableOpacity>
                                                :

                                                <View style={{ position: 'absolute', right: 2, alignItems: 'center', borderRadius: 16, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 2, flexDirection: 'row' }}>
                                                    <TouchableOpacity onPress={() => this.DecreQty(data.id)}>
                                                        <Image source={images.minus} style={{ height: 16, width: 16 }} />
                                                    </TouchableOpacity>

                                                    <Text style={{ marginHorizontal: 5, fontSize: 14 }} >{data.quantity}</Text>

                                                    <TouchableOpacity onPress={() => this._addQty(data.id)}>
                                                        <Image source={images.plus} style={{ height: 16, width: 16 }} />
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                        </View>
                                        {/* <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{data.category_name}</Text>

                                        <TouchableOpacity
                                         onPress={()=>this.gotToAddServiceDetail(data.id)} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                          
                                            <Text style={{ position: 'absolute', paddingHorizontal: 15, borderWidth: 1, fontSize: 12, borderRadius: 16, paddingVertical: 2, right: 2 }}>Add</Text>
                                          
                                        </TouchableOpacity> */}

                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                            <Image resizeMode={'contain'} source={images.rupe} style={{ height: 17, width: 17 }} />
                                            <Text style={{ fontSize: 18 ,marginTop:5, fontFamily:fonts.PoppinsRegular}}>{data.price}</Text>

                                            {data.ratings == 0 ? null :
                                                <View style={{ position: 'absolute', flexDirection: 'row', right: 2, right: 2 }}>
                                                    <Image resizeMode={'contain'} source={images.star} style={{ height: 15, width: 15 }} />
                                                    <Text style={{ fontSize: 10, color: '#555555', fontFamily:fonts.PoppinsSemiBold, marginLeft: 5 }}>{data.avg_rating} {'('}{data.ratings} ratings)</Text>
                                                </View>
                                            }
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            marginTop: 12, paddingHorizontal: 8, paddingVertical: 5, borderWidth: 0.5, borderRadius: 10, marginHorizontal: 2,
                            borderColor: '#FCFBFB', paddingStart:20, backgroundColor: Colors.white, elevation: 3, marginBottom: 5,
                        }}>
                            <Text style={{ fontFamily:fonts.PoppinsBold, fontSize: 15 }}>Description</Text>
                            <Text style={{ fontSize: 12, marginTop: 10 ,lineHeight:20, fontFamily:fonts.PoppinsRegular}}>{data.description}</Text>
                                {/* {data.link ? 
                                    <TouchableOpacity style={{ alignSelf:'flex-end', width: 70, marginTop:5}} onPress={() => this.props.navigation.navigate("WebPage", { title: "Details", link : data.link })}>
                                        <Text style={{ alignSelf: 'flex-end', fontSize: 12, fontFamily: fonts.PoppinsRegular }}>Click here</Text>
                                    </TouchableOpacity> : null } */}
                                   
                        </View>

                        {this.state.arrRating.length <= 0 ? null :
                            <>
                                <Text style={{ fontFamily:fonts.PoppinsBold, marginVertical: 12, fontSize: 15 }}> Rating & Reviews {data.avg_rating}</Text>

                                <View style={{
                                    marginTop: 12, paddingHorizontal: 8, marginBottom: 50, paddingVertical: 5, borderWidth: 0.5, borderRadius: 10, marginHorizontal: 2,
                                    borderColor: '#FCFBFB', backgroundColor: Colors.white, elevation: 3,
                                }}>
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={this.state.arrRating}
                                        renderItem={this._renderUpComingItem}
                                        extraData={this.state}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                            </>
                        }
                    </View>
                </ScrollView>
                {this.state.apiResponse == false ? null : (data.quantity == 0) ? null :
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddService')} style={{ position: 'absolute', bottom: 0, backgroundColor: 'black', height: 50, width: '100%', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>BOOK NOW</Text>
                    </TouchableOpacity>
                }
            </SafeAreaView>
        )
    }

}
