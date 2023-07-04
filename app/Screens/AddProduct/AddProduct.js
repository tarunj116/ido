import React from 'react';
import { Text, View, ScrollView, FlatList,StyleSheet, Image, TouchableOpacity, SafeAreaView, } from 'react-native';
import styles from './AddProductStyles';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import ViewPager from '@react-native-community/viewpager';
import AppHeader from '../../Comman/AppHeader';
import Constant from '../../config/Constant';
import ApiCallHelper from '../../config/ApiCallHelper';
import Helper from '../../config/Helper';


export default class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            arrService: [1, 2, 3],
            data: this.props.route.params?.data,
            slotTime: this.props.route.params.slotTime,
            arrProduct: [],
            arrSelectedProduct:[]

        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Add Product', borderBottomRadius: 0,
            bellIcon: false,
            settingsIcon: false,
            headerBg: false,
            hideLeftBackIcon: false,

        })
    }

    skip() {
        this.props.navigation.navigate('PaymentReview', { data: this.props.route.params?.data , slotTime :this.props.route.params.slotTime, selectedProductArr:"" })
    }

    componentDidMount() {
        console.log("ddddd--------------", this.props.route.params?.data);
        this.getProductList()
    }

    getProductList() {
        let data = {
            category_id: Helper.mainCategoryId,
            user_id : Helper.userData.id
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.products, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                this.setState({ arrProduct: response.data })

            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }


    _renderUpComingItem = ({ item, index }) => {
        return (
            <View style={styles.listView}>

            <TouchableOpacity onPress={() => {}} style={{ paddingHorizontal: 10, marginTop: 3, alignItems: 'center', }} >
                <View style={{ flexDirection: 'row', paddingVertical: 10, width: '100%' }}>
                    <Image resizeMode={'stretch'} source={{ uri: item.image }} style={{ height: 60, width: 60 }} />
                    <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                            <Text numberOfLines={2} style={{ fontFamily:fonts.PoppinsBold,fontSize: 15 ,marginRight:item.quantity == 0? '25%' :  '35%',}}>{item.title}</Text>
                           
                            {item.quantity == 0 ?
                                <TouchableOpacity onPress={() => { this.gotToAddServiceDetail(item.id) }} style={{ position: 'absolute', right: 2 }}>
                                    <Text style={{ paddingHorizontal: 15, borderWidth: 1, fontSize: 12, borderRadius: 16, paddingVertical: 2, }}>Add</Text>
                                </TouchableOpacity> :

                                <View style={{ position: 'absolute', right: 2, alignItems: 'center', borderRadius: 16, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 2, flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.DecreQty(index, item)}>
                                        <Image source={images.minus} style={{ height: 16, width: 16 }} />
                                    </TouchableOpacity>

                                    <Text style={{ marginHorizontal: 5, fontSize: 14 }} >{item.quantity}</Text>

                                    <TouchableOpacity onPress={() => this._addQty(index, item.id)}>
                                        <Image source={images.plus} style={{ height: 16, width: 16 }} />
                                    </TouchableOpacity>
                                </View>

                            }
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                            <Image resizeMode={'contain'} source={images.rupe} style={{ height: 17, width: 17 }} />
                            <Text style={{ fontSize: 18, marginTop:5, fontFamily:fonts.PoppinsRegular}}>{item.price}</Text>

                            {/* {item.ratings == "0" ? null :
                                <View style={{ position: 'absolute', flexDirection: 'row', right: 2, right: 2 }}>
                                    <Image resizeMode={'contain'} source={images.star} style={{ height: 15, width: 15 }} />
                                    <Text style={{ fontSize: 10, color: '#555555', marginLeft: 5 }}>{item.avg_rating} {'('}{item.ratings} ratings)</Text>
                                </View>
                            } */}
                        </View>
                    </View>
              
                </View>
            </TouchableOpacity>


        </View>

      )
    }

    gotToAddServiceDetail(id) {
       // alert(Helper.userData.id)
        var data = {}
        data.product_id = id,
        data.user_id = Helper.userData.id
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.addtocartproduct, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("------services services", response.data)
            if (response.status == true) {
                this.getProductList()
                Helper.showToast(response.message)
                // this.setState({ arrServices: response.data, })

            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })

    }


    _addQty(index, pr) {
        var data = this.state.arrProduct;
        console.log("data--------------------", data);
        data[index].quantity = Number(data[index].quantity)  + 1;
        // data[index].price = pr * data[index].quantity;
        // this.setState({quntity:data});
        this.setState({ total_amount: Number(this.state.total_amount) + Number(data[index].price) });
        console.log("qqqqqqqqqqqqqqqqq", data[index].quantity)
        this.incrementDecrement(data[index].id,"1")
    }

    DecreQty(index, pr) {
        var data = this.state.arrProduct;
        if (data[index].quantity == 0) {

        return;
        } else {
            data[index].quantity = Number(data[index].quantity) - 1;
            //  data[index].price = data[index].price -  pr;
            //  this.setState({quntity:data});
            this.setState({ total_amount: Number(this.state.total_amount) - Number(data[index].price) });
            // this.addCart( data[index].product_id, data[index].quantity , data[index].price);
           this.incrementDecrement(data[index].id, "2")
           // this.incrementDecrement(id, "2")
        }
        if (data[index].quantity == 0) {
          //  var deletedItem = this.state.arrProduct.splice(index, 1);
            //  this.setState({arrService : deletedItem})
           // console.log("--------------------------", deletedItem)
        }
    }

    // _addQty(id) {
    //     this.incrementDecrement(id, "1")
    // }

    // DecreQty(id,) {
    //     this.incrementDecrement(id, "2")
    // }

    incrementDecrement(id,type) {
        var data = {}
        data.product_id = id,
        data.user_id = Helper.userData.id
        data.type = type
         Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.quantitycounterproduct, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
           // console.log("------services services", response.data)
            if (response.status == true) {
                this.getProductList()
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }


    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>

                <View style={{ marginHorizontal: 15, backgroundColor: Colors.white, }} key="1">

                    <View style={{ marginHorizontal: 15, marginTop: 20 }}>
                        <Text style={{
                            color: Colors.black, fontSize: 15,
                            fontFamily: fonts.PoppinsBold,  textAlign: 'center'
                        }}>Would you like to add some product for your service</Text>
                    </View>

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
                    borderTopWidth: 1, borderTopColor: '#00000010',
                    backgroundColor: Colors.white,
                    elevation: 3,
                    bottom: 0, opacity: 100, width: '100%',
                    position: 'absolute', justifyContent: 'space-between',
                    height: 68, alignItems: 'flex-end', paddingHorizontal: 20, justifyContent: 'center'
                }}>
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity onPress={() => this.addProduct()} style={{ marginRight: 20, height: 28, width: 153, backgroundColor: Colors.black, borderRadius: 14, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12,fontFamily:fonts.PoppinsSemiBold, color: Colors.white, textAlign: 'center' }}>Add Product & Next</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.skip()} style={{ borderWidth: 1, borderColor: Colors.black, height: 28, width: 73, borderRadius: 28 / 2, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: fonts.fontSize12, color: Colors.black, textAlign: 'center' }}>Skip</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
addProduct(){
  //  console.log(filter(this.state.arrService, { quantity:0 }));
  let people = this.state.arrProduct
  console.log(people);
  this.state.arrSelectedProduct = []
  people.filter(person => person.quantity > 0).map(filteredPerson => (
     // this.setState({arrSelectedProduct : filteredPerson}),
      this.state.arrSelectedProduct.push(filteredPerson),
     // this.setState({arrSelectedProduct : filteredPerson}),
      console.log("fi------------------", filteredPerson)
  ))
  if(this.state.arrSelectedProduct  <=0){
      Helper.showToast("Please add product")
      return
  }else{

    this.props.navigation.navigate('PaymentReview', { data: this.props.route.params?.data ,slotTime :this.props.route.params.slotTime ,selectedProductArr :  this.state.arrSelectedProduct })

  }
   // console.log(data);
}
};
