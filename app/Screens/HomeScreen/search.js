import React from 'react';
import { Text, View, ScrollView,StyleSheet,FlatList, Image, TouchableOpacity, SafeAreaView, } from 'react-native';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import ApiCallHelper from '../../config/ApiCallHelper';
import Constant from '../../config/Constant';
import Helper from '../../config/Helper'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';


export default class AddService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            qty: 0,
            total_amount: 0,
            arrService: [],

        }
    }

    componentDidMount() {
        this.getSearchData();
    }

    getSearchData() {
        var data = {
            "city":Helper.city,
            "search":this.props.route?.params?.search
        }
        console.log(data);
       // data.product_id = id,
          
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.services, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("------services services", response)
            if (response.status == true) {
                let data = response?.data
                this.setState({ arrService: data })
                
               // Helper.showToast(response.message)
             //   this.props.navigation.navigate('AddService')
               // this.setState({ arrServices: response.data, })
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }


    
    _addQty(index, pr) {
        var data = this.state.arrService;
        data[index].quantity = Number(data[index].quantity)  + 1;
        this.setState({ total_amount: Number(this.state.total_amount) + Number(data[index].price) });
        this.incrementDecrement(data[index].id,"1")
    }

    DecreQty(index, pr) {
        var data = this.state.arrService;
        if (data[index].quantity == 0) {

        return;
        } else {
            data[index].quantity = Number(data[index].quantity) - 1;
            this.setState({ total_amount: Number(this.state.total_amount) - Number(data[index].price) });
            this.incrementDecrement(data[index].id, "2")
        }
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
        return (
            <View style={[styles.history_view, { paddingHorizontal: 10, }]}>

                <View style={{ flexDirection: 'row',flex:1, paddingVertical: 10, width: '100%' }}>
                    <Image resizeMode={'cover'} source={{ uri: item.banner_image }} style={{ height: 60, width: 60 }} />
                   
                    <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10 }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                          
                            <Text style={{ fontFamily:fonts.PoppinsBold, fontSize: 15, marginRight:item.quantity == 0? '25%' :  '32%',}}>{item.title}</Text>

{(item.quantity)?
    <View style={{ position: 'absolute', right: 2, alignItems: 'center', borderRadius: 16, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 2, flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.DecreQty(index, item.price)}>
                                    <Image source={images.minus} style={{ height: 16, width: 16 }} />
                                </TouchableOpacity>

                                <Text style={{ marginHorizontal: 5, fontSize: 14 }} >{item.quantity}</Text>

                                <TouchableOpacity onPress={() => this._addQty(index, item.price)}>
                                    <Image source={images.plus} style={{ height: 16, width: 16 }} />
                                </TouchableOpacity>
                            </View>
:
<View style={{ position: 'absolute', right: 2,}}>
<TouchableOpacity style={{backgroundColor:"#000",flexDirection:'row',borderRadius:20,width:widthPercentageToDP(17),height:heightPercentageToDP(4),justifyContent:'center',alignItems:'center'}} onPress={() => this._addQty(index, item.price)}>
                                    <Image source={images.plus} style={{ tintColor:'#fff',height: 16, width: 16 }} />
                                    <Text style={{color:"#fff",marginLeft:widthPercentageToDP(1)}}>Add</Text>
                                </TouchableOpacity>
                    </View>
}
                            

                            
                             {/* <TouchableOpacity style={{ }}>
                                    <Image source={images.addservice} resizeMode={'contain'} style={{ height: 28, width: 72 }} />
                                </TouchableOpacity>  */}

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                            <Image resizeMode={'contain'} source={images.rupe} style={{ height: 17, width: 17 }} />
                            <Text style={{ fontSize: 18,marginTop:5, fontFamily:fonts.PoppinsRegular, }}>{item.price}</Text>

                            {item?.ratings == "0" ? null :
                                    <View style={{ position: 'absolute', flexDirection: 'row', right: 2, right: 2 }}>
                                        <Image resizeMode={'contain'} source={images.star} style={{ height: 15, width: 15 }} />
                                        <Text style={{ fontSize: 10, color: '#555555',fontFamily:fonts.PoppinsSemiBold, marginLeft: 5 }}>{item?.avg_rating} {'('}{item?.ratings} ratings)</Text>
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
                <View style={{flexDirection:'row',height:heightPercentageToDP(6),alignItems:'center',paddingHorizontal:widthPercentageToDP(5),justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.goBack()
                        }}>
                            <Image source={images.arrow_left} style={{height:25,width:25}} />
                        </TouchableOpacity>
                        <Text style={{marginLeft:widthPercentageToDP(5)}}>{this.props.route?.params?.search}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate('AddService');
                    }}>
                        <Image source={images.cart} style={{height:25,width:25}} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={{ marginHorizontal: 15, flexDirection: 'column', backgroundColor: Colors.white, }} key="1">
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
                <TouchableOpacity style={{backgroundColor:'#000',bottom:0,height:heightPercentageToDP(7),position:'absolute',width:widthPercentageToDP(100),justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#fff',fontSize:16}}>Book Now</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

};


const styles = StyleSheet.create({
    safe_area_view: {
        flex: 1,
        backgroundColor: '#fff'
    },
    up_his_btn_view:{
        marginHorizontal: 16, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 25
    },
    up_coming_touch:{
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 160,
        height: 40, 
        borderWidth: 1, 
        borderRadius: 10,
    },
    up_coming_text:{
        lineHeight: 17, 
        fontFamily: fonts.RoBoToMedium_1,
        fontSize: fonts.fontSize14,
    },
    history_touch:{
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 160, 
        height: 40,
        borderWidth: 1, 
        borderRadius: 10,
    },
    history_text:{
        fontSize: fonts.fontSize14, 
        lineHeight: 17,
        fontFamily: fonts.RoBoToMedium_1
    },
    view_pager:{
        flex: 1,
    },
    up_coming_view:{
        marginTop: 10, 
        backgroundColor: Colors.white, 
        paddingVertical: 5 
    },
    up_coming_profile_view:{
        marginVertical: 5, 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginHorizontal: 16, 
        justifyContent: 'space-between'
    },
    profile_flex_view:{
        flex: 1.2,
    },
    profile_img_view:{
        width: 35, 
        height: 35, 
        borderRadius: 10,
    },
    profile_img:{
        width: '100%', 
        height: '100%'
    },
    user_name_flex:{
        flex: 7,
    },
    user_name_text:{
        color: Colors.black, 
        fontSize: fonts.fontSize15, 
        fontFamily: fonts.RoBoToBold_1, 
        lineHeight: 14,
    },
    rate_view:{
        flex: 2, 
        alignItems: 'flex-end'
    },
    rate_text:{
        color: Colors.black, 
        fontSize: fonts.fontSize15, 
        fontFamily: fonts.RoBoToBold_1, 
        lineHeight: 14,
    },
    view_text_img_small:{
        marginHorizontal: 16, 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: 5
    },
   dog_img_view:{
    flex: .7
   },
   dog_img:{
    width: 13, 
    height: 12.2
   },
   title_view:{
    flex: 9.2
   },
   title_name:{
    fontSize: fonts.fontSize12, 
    lineHeight: 14, 
    fontFamily: fonts.RoBoToRegular_1, 
    color: Colors.warmGreyThree
   },
   calender_view:{
    flex: .4 
   },
   calender_img:{
    width: 10.7, 
    height: 11.8
   },
   date_view:{
    flex: 9.6
   },
   date_text:{
    marginLeft: 8.3, 
    fontSize: fonts.fontSize12, 
    lineHeight: 14, 
    fontFamily: fonts.RoBoToRegular_1, 
    color: Colors.warmGreyThree
   },
   location_img_view:{
    flex: .4
   },
   location_img:{
    width: 8.7, 
    height: 12.1
   },
   location_text_view:{
    flex: 9.6
   },
   location_text:{
    marginLeft: 8.3, 
    fontSize: fonts.fontSize12, 
    lineHeight: 14, 
    fontFamily: fonts.RoBoToRegular_1, 
    color: Colors.warmGreyThree
   },
   history_view:{
    borderWidth:0.5,
    borderRadius:10,
    marginHorizontal:2,
    marginBottom:10,
    borderColor:'#FCFBFB',
    backgroundColor: Colors.white, 
    elevation:3,
    marginTop:2
   
   },
   img_calender_location_list_view:{
    marginHorizontal: 16, 
    flexDirection: 'row', 
    alignItems: 'center', 
   
   },
   flex_img_view:{
    flex: .4
   },
   flex_text_view:{
    flex: 9.6
   },
   history_dog_img:{
    width: 13, 
    height: 12.2
   },
   dog_title:{
    marginLeft: 8.3, 
    fontSize: fonts.fontSize12, 
    lineHeight: 14, 
    fontFamily: fonts.RoBoToRegular_1, 
    color: Colors.warmGreyThree
   },
   history_calender_img:{
    width: 10.7, 
    height: 11.8
   },
   history_date_title:{
    marginLeft: 8.3, 
    fontSize: fonts.fontSize12, 
    lineHeight: 14, 
    fontFamily: fonts.RoBoToRegular_1, 
    color: Colors.warmGreyThree
   },
   history_location_img:{
    width: 8.7, 
    height: 12.1
   },
   history_address:{
    marginLeft: 8.3, 
    fontSize: fonts.fontSize12, 
    lineHeight: 14, 
    fontFamily: fonts.RoBoToRegular_1, 
    color: Colors.warmGreyThree
   },


});