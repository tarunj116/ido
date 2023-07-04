import React from 'react';
import { Text, View, ScrollView, FlatList, Image, TouchableOpacity, SafeAreaView, Dimensions, } from 'react-native';
import styles from './CategoryStyles';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import ViewPager from '@react-native-community/viewpager';
import AppHeader from '../../Comman/AppHeader';
import ApiCallHelper from '../../config/ApiCallHelper';
import Constant from '../../config/Constant';
import HTML from "react-native-render-html";

import { handleNavigation } from '../../navigation/Navigation';
//import Helper from '../../Lib/Helper';
import Helper from '../../config/Helper'
export default class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrSubcategory: [],
            refreshing: false,
            isLoading: true,
            category_id: this.props.route.params.data?.id,
            service_id:this.props.route.params.data?.service_id,
            title: this.props.route.params.data?.title,
            index: 0,
        }
        AppHeader({
            ...this.props.navigation, leftTitle: this.state.title, borderBottomRadius: 0,
            bellIcon: false,
            settingsIcon: false,
            headerBg: false,
            hideLeftBackIcon: false,
            CartIcon: true,
            tintColor: "black",
            cartIconClick: () => this.cartIconClick(),
            // bellIconClick: () => this.bellIconClick(),
            // settingIconClick: () => this.settingIconClick()
        })

    }

    cartIconClick() {
        this.props.navigation.navigate('AddService')
    }

    // settingIconClick() {
    //     this.props.navigation.navigate('SettingsScreen')
    // }

    // bellIconClick() {
    //     this.props.navigation.navigate('NotificationsScreen')
    // }
    gotToActivityDetail() {
        this.props.navigation.navigate('ActivityDetailScreen')
    }

    componentDidMount() {
        this.getSubcategory()
    }

    getSubcategory() {
        var data = {}
        data.category_id = this.state.category_id
        data.service_id = this.state.service_id
       
       
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.subcategory, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                this.setState({ arrSubcategory: response.data })

            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }


    goToCategoryDetails(item) {
        Helper.mainCategoryId = this.state.category_id
        handleNavigation({
            type: 'push', page: 'CategoryDetails', navigation: this.props.navigation, passProps: {
                data: item
            }
        })
    }

    _renderActivity = ({ item, index }) => {
        console.log("---", item.image);
        return (
            <View style={{
                flex: 1,
                maxWidth: Dimensions.get('window').width / 3 - 10, // Width / 3 - (marginLeft and marginRight for the components)
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                margin: 10
            }}>
                <TouchableOpacity onPress={() => this.goToCategoryDetails(item)} style={{ height: 130, width: '100%' }}>
                    <Image resizeMode={'stretch'} source={{ uri: item.image }}
                        style={{ height: 110, width: 100 }}>
                    </Image>
                </TouchableOpacity>
                <Text numberOfLines={2} style={{ color: "#4C4C4C", fontSize: 12, fontFamily: fonts.PoppinsBold }}>{item.title}</Text>

            </View>

        )
    }

    render() {
        console.log(this.props.route.params.data);
        return (
            <SafeAreaView style={styles.safe_area_view}>
                <ScrollView>
                    <View style={{ backgroundColor: Colors.white, }} key="1">
                        <Image resizeMode={'stretch'} source={this.props.route.params.data.banner_image ? { uri: this.props.route.params.data.banner_image } : images.test3} style={{ height: 180, marginHorizontal: 10, }}></Image>
                        <View style={{ marginTop: 20, }}>
                            <FlatList
                                numColumns={3}
                                showsVerticalScrollIndicator={false}
                                data={this.state.arrSubcategory}
                                renderItem={this._renderActivity}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        <View style={{
                            backgroundColor: '#FFF7F7', marginHorizontal: 10, marginBottom: 20,
                            borderRadius: 5, borderColor: '#D4D4D4', borderWidth: 1, paddingHorizontal: 10,
                        }}>
                            <View style={{ flexDirection: 'row', }}>
                                <HTML source={{ html: this.props.route.params?.data?.note }} />
                            </View>
                            {this.props.route.params?.data?.link ?
                                <TouchableOpacity style={{ alignSelf: 'flex-end', width: 70, }} onPress={() => this.props.navigation.navigate("WebPage", { title: "Details", link: this.props.route.params?.data?.link })}>
                                    <Text style={{ alignSelf: 'flex-end', fontSize: 12, fontFamily: fonts.PoppinsRegular }}>Click here</Text>
                                </TouchableOpacity>
                                : null}

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

};