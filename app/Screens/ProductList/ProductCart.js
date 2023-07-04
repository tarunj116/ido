import React from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, } from 'react-native';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import AppHeader from '../../Comman/AppHeader';
import Constant from '../../config/Constant';
import ApiCallHelper from '../../config/ApiCallHelper';
import Helper from '../../config/Helper';
import RazorpayCheckout from 'react-native-razorpay';


export default class ProductCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            arrProduct: [],
            arrSelectedProduct: [],
            paymentType: "",
            lastAmount:null,
            arrpaymentType: [
              { type: "Cash on home", id: "1" },
               { type: "Online Pay", id: "2" }
          ],

        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Product Cart', borderBottomRadius: 0,
            bellIcon: false,
            settingsIcon: false,
            headerBg: false,
            hideLeftBackIcon: false,

        })
    }



    componentDidMount() {
        this.getProductList()
    }

    getProductList() {
        let data = {
            category_id: "",
            user_id: Helper.userData.id
        }

        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.productscartlists, JSON.stringify(data), Constant.APIPost).then((response) => {
          console.log("sssss",response)
            Helper.globalLoader.hideLoader();
            if (response.status == true) 

            { 
                var lastAmount = 0;
               
                for (let i in response.data) {
                    let price = Number(response.data[i]["quantity"]) * Number(response.data[i].service_details.price);
                    lastAmount += price;
                }
                this.setState({ arrProduct: response.data,lastAmount:lastAmount })

            } 
            else {
              
             }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }


    _renderUpComingItem = ({ item, index }) => {
        return (
            <View style={styles.listView}>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('ProductDetails', { data: item })

                }} style={{ paddingHorizontal: 10, marginTop: 3, alignItems: 'center', }} >
                    <View style={{ flexDirection: 'row', paddingVertical: 10, width: '100%' }}>
                        <Image resizeMode={'stretch'} source={{ uri: item?.service_details.image }} style={{ height: 60, width: 60 }} />
                        <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                <Text numberOfLines={2} style={{ fontFamily: fonts.PoppinsBold, fontSize: 14, }}>{item?.service_details.title}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 2 }}>
                                <Image resizeMode={'contain'} source={images.rupe} style={{ height: 17, width: 17 }} />
                                <Text style={{ fontSize: 18, marginTop: 5, fontFamily: fonts.PoppinsRegular }}> {item?.quantity } X {item?.service_details.price}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
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
    
    data.total_amount = this.state.lastAmount
   
    data.paymentType = this.state.paymentType
  
    data.transtionId =  trnId == '1' ? "" : trnId
   


    console.log("send data--", JSON.stringify(data));
    
    Helper.globalLoader.showLoader();
    ApiCallHelper.getNetworkResponce("save-products-booking", JSON.stringify(data), Constant.APIPost).then((response) => {
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
                <ScrollView>
                <View style={{ marginHorizontal: 15, backgroundColor: Colors.white, }} key="1">

                    <View style={{ marginTop: 20, marginHorizontal: 0 }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.arrProduct}
                            renderItem={this._renderUpComingItem}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
                <View style={{
                       
                       marginBottom:20,
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
      
                               <TouchableOpacity onPress={() => { this.setState({ paymentType: item.id }) }} style={{ marginTop: 0,flexDirection:'row' }}>
                                   <Image
                                       source={this.state.paymentType == item.id ? images.radio_btn_selected : images.radio_btn_un_selected}
                                       style={{  height:14,
                                         width:14,
                                         tintColor: Colors.warmGreyTwo}}
                                   />
                                   <Text style={{    marginLeft:10,
                                                        fontSize:fonts.fontSize14,
        fontFamily:fonts.RoBoToRegular_1,
        fontWeight:'900',
        lineHeight:17,
        color:Colors.black}}>{item.type}</Text>
                               </TouchableOpacity>
                           </View>
                       })}
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
                            }}>{this.state.arrProduct.length}</Text>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                            <Image resizeMode={'contain'} source={images.rupe} style={{ height: 17, width: 17 }} />
                            <Text style={{ fontSize: 18, fontFamily:fonts.PoppinsRegular, marginTop:5 }}>{this.state.lastAmount}</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => this.bookNow()} style={{ backgroundColor: Colors.black, height: 28, width: 73, borderRadius: 28 / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: Colors.white,fontSize: 12,
                            fontFamily: fonts.PoppinsSemiBold }}>Submit</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        )
    }

};


const styles = StyleSheet.create({
    safe_area_view: {
        flex: 1,
        backgroundColor: '#fff'
    },
    listView: {
        borderWidth: 0.5,
        borderRadius: 10,
        marginHorizontal: 2,
        marginBottom: 10,
        borderColor: '#FCFBFB',
        backgroundColor: Colors.white,
        elevation: 3,
        marginTop: 2
    },
})