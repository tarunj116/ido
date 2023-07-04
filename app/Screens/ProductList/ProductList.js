import React from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, } from 'react-native';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import AppHeader from '../../Comman/AppHeader';
import Constant from '../../config/Constant';
import ApiCallHelper from '../../config/ApiCallHelper';
import Helper from '../../config/Helper';


export default class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            arrProduct: [],
            arrSelectedProduct: []

        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Product List', borderBottomRadius: 0,
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
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('ProductDetails', { data: item })

                }} style={{ paddingHorizontal: 10, marginTop: 3, alignItems: 'center', }} >
                    <View style={{ flexDirection: 'row', paddingVertical: 10, width: '100%' }}>
                        <Image resizeMode={'stretch'} source={{ uri: item?.image }} style={{ height: 60, width: 60 }} />
                        <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                <Text numberOfLines={2} style={{ fontFamily: fonts.PoppinsBold, fontSize: 14, }}>{item?.title}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 2 }}>
                                <Image resizeMode={'contain'} source={images.rupe} style={{ height: 17, width: 17 }} />
                                <Text style={{ fontSize: 18, marginTop: 5, fontFamily: fonts.PoppinsRegular }}>{item?.price}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }


    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>

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