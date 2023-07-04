import React from 'react';
import { Text, View, FlatList,StyleSheet, SafeAreaView, PermissionsAndroid, Platform, Dimensions, TouchableOpacity, ScrollView, TextInput, Image, ImageBackground, DeviceEventEmitter } from 'react-native';
import styles from './HomeScreenStyles';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import { GButton } from '../../Comman/GButton';
import AppHeader from '../../Comman/AppHeader';
import Carousel from 'react-native-banner-carousel';
//import Imagaes from '../../Assets/newImage.'
import ApiCallHelper from '../../config/ApiCallHelper'
import Helper from '../../config/Helper'
import Constant from '../../config/Constant'
import { handleNavigation } from '../../navigation/Navigation';
import Geolocation from '@react-native-community/geolocation';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 180;

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search:'',
            search_activity: '',
            arrCategory: [],
            arrBanner: [],
            arrService: [],
            arrOffers: [],
            covidTitle: "",
            covidLink: '',
            covidImage: "",
            arrActivity: [
                {
                    title: 'Beauty Parlour',
                    walking_img: require('../../Assets/newImage/hairdye.png'),
                },
                {
                    title: 'Wipe',
                    walking_img: require('../../Assets/newImage/wipe.png'),
                },
                {
                    title: 'Haircut',
                    walking_img: require('../../Assets/newImage/haircut.png'),
                },
                {
                    title: 'Repair',
                    walking_img: require('../../Assets/newImage/repairtools.png'),
                },
                {
                    title: 'Massage at home',
                    walking_img: require('../../Assets/newImage/massage.png'),
                },
                {
                    title: 'Plumbing',
                    walking_img: require('../../Assets/newImage/plumber.png'),
                }, {
                    title: 'Carpenter',
                    walking_img: require('../../Assets/newImage/carpenter.png'),
                }, {
                    title: 'Electronics',
                    walking_img: require('../../Assets/newImage/washingmachine.png'),
                }, {
                    title: 'Makeup',
                    walking_img: require('../../Assets/newImage/skinproblem.png'),
                },
            ]
        }

        AppHeader({
            ...this.props.navigation,
            leftTitle: Helper.userData.name,
            leftIcon: { uri: Helper.userData.profile_pic },
            loaction: Helper.currentAddress,
            profileIcon: true,
            bgColor: true,
            // hideLeftBackIcon: false,
            headerBg: true,
            CartIcon: true,
            tintColor: "white",
            cartIconClick: () => this.cartIconClick(),
            leftClick: () => this.leftClick(),
            leftIconStyle: { height: 40, width: 40, borderRadius: 40 / 2, resizeMode: 'cover' },

        })

    }

    leftClick() {
        this.props.navigation.navigate('Profile')
    }
    cartIconClick() {
        this.props.navigation.navigate('AddService')
    }

    goToCategoryScreen(item) {
        handleNavigation({
            type: 'push', page: 'Category', navigation: this.props.navigation, passProps: {
                data: item
            }
        })
    }

    // goToCategoryScreen() {
    //     this.props.navigation.navigate('Category')
    // }

    componentDidMount() {
        this.requestLocationPermission()
        this.getBanner()
        this.getCategory()

        this.updateProfile = DeviceEventEmitter.addListener("ProfileUpdate", (data) => {
            AppHeader({
                ...this.props.navigation,
                leftTitle: Helper.userData.name,
                leftIcon: { uri: Helper.userData.profile_pic },
                profileIcon: true,
                bgColor: true,
                // hideLeftBackIcon: false,
                headerBg: true,
                CartIcon: true,
                tintColor: "white",
                cartIconClick: () => this.cartIconClick(),
                leftClick: () => this.leftClick(),
                leftIconStyle: { height: 40, width: 40, borderRadius: 40 / 2, resizeMode: 'cover' },

            })
        })

    }





    requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            this.getOneTimeLocation();
            this.subscribeLocationLocation();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Access Required',
                        message: 'This App needs to Access your location',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //To Check, If Permission is granted
                    this.getOneTimeLocation();
                    this.subscribeLocationLocation();
                } else {
                    alert('Permission Denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };

    getOneTimeLocation = () => {

        Geolocation.getCurrentPosition((info) => {
            this.GetAddressFromLatLong(info.coords?.latitude, info.coords?.longitude)

        })
    }

    subscribeLocationLocation = () => {

        Geolocation.getCurrentPosition((info) => {
            this.GetAddressFromLatLong(info.coords?.latitude, info.coords?.longitude)
        })
    };

    GetAddressFromLatLong(latitude, longitude,) {
        Helper.Current_latitude = latitude
        Helper.Current_longitude = longitude
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=' + Helper.GoogleApiKey)
            .then((response) => response.json())
            .then((responseJson) => {

                // return cb(responseJson.results[0].formatted_address)

                AppHeader({
                    ...this.props.navigation,
                    leftTitle: Helper.userData.name,
                    leftIcon: { uri: Helper.userData.profile_pic },
                    loaction: responseJson?.results[0]?.address_components[1]?.long_name,
                    profileIcon: true,
                    bgColor: true,
                    // hideLeftBackIcon: false,
                    headerBg: true,
                    CartIcon: true,
                    tintColor: "white",
                    cartIconClick: () => this.cartIconClick(),
                    leftClick: () => this.leftClick(),
                    leftIconStyle: { height: 40, width: 40, borderRadius: 40 / 2, resizeMode: 'cover' },

                })
            }).catch((err) => {
                // Helper.showToast("Unable to get your location")
            })
    }

    getBanner() {
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.banner, '', Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                this.state.covidTitle = response.covidttile
                this.state.covidLink = response.Link
                this.state.covidImage = response.covidimg
                this.setState({ arrBanner: response.data, arrOffers: response.best_offer, arrService: response.is_service })
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    getCategory() {
        let data = {
            city: Helper.city,
            // long: Helper.Current_longitude
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.category, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                this.setState({ arrCategory: response.data })
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }


    _renderCategoryitem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, marginTop: index == 0 || index == 1 || index == 2 ? 0 : 10 }}>
                <TouchableOpacity onPress={() => this.goToCategoryScreen(item)}
                    style={{ marginHorizontal: 5, paddingVertical: 10 }}>
                    <Image source={{ uri: item.image }} resizeMode={'contain'}
                        style={{ height: 50, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    </Image>
                </TouchableOpacity>
                <Text style={{ color: "#4C4C4C", textAlign: 'center', fontSize: 14, fontFamily: fonts.PoppinsRegular, }}>{item.title}</Text>
            </View>
        )
    }

    renderPage(item, index) {
        return (
            <View style={{ justifyContent: 'center', paddingVertical: 5, alignItems: 'center' }} key={index}>
                <Image style={{ width: '92%', borderRadius: 20, height: 200 }} source={{ uri: item.banner }} />
            </View>
        );
    }
    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22, backgroundColor: 'white' }}>
                <View style={{alignSelf:'center'}}>
                    <View style={style.searchboxView}>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.navigate('Search',{search:this.state.search});
                        }} style={{position:'absolute',right:wp(4),top:hp(1)}}>
                            <Image source={images.search_ic} style={{height:20,width:20,tintColor:'#000'}} />
                        </TouchableOpacity>
                        <View>
                            <TextInput onChangeText={(value) => {
                                this.setState({search:value})
                            }} placeholder={'Search'} placeholderTextColor={'#b2b9c0'} paddingVertical={1} style={style.searchbox} />
                        </View>
                    </View>
                </View>

                    {/* <View style={{ backgroundColor: Colors.white }}>
                        <View style={styles.search_box_blue}>
                            <View style={{ marginHorizontal: 16 }}>
                                <View style={styles.search_box_view}>
                                    <TouchableOpacity style={styles.search_touch}>
                                        <Image source={images.search_ic} resizeMode={'contain'} style={styles.search_img} />
                                    </TouchableOpacity>

                                    <TextInput
                                        style={styles.input_text}
                                        placeholder="Search for service"
                                        keyboardType={'default'}
                                        returnKeyType="done"
                                        placeholderTextColor={Colors.black}
                                        underlineColorAndroid='transparent'
                                    />
                                </View>
                            </View>
                        </View>
                    </View> */}

                    <View style={{ marginTop: 10, }}>
                        <Carousel
                            autoplay
                            autoplayTimeout={3000}
                            loop
                            pageIndicatorContainerStyle={{ marginBottom: -20 }}
                            activePageIndicatorStyle={{ backgroundColor: '#000' }}
                            index={0}
                            pageSize={BannerWidth}
                        >
                            {this.state.arrBanner.map((item, index) => this.renderPage(item, index))}
                        </Carousel>
                    </View>


                    <FlatList
                        style={{ marginTop: 30, backgroundColor: Colors.white, paddingHorizontal: 10 }}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.arrCategory}
                        numColumns={3}
                        renderItem={this._renderCategoryitem}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    {this.state.covidTitle ?
                        <>

                            <View style={{ flexDirection: 'row', alignContent: 'center', paddingHorizontal: 15, marginTop: 15 }}>
                                {/* <Text style={{ fontSize: 20, fontFamily: fonts.PoppinsExtraBold }}>{this.state.covidTitle}</Text> */}
                                <Text style={{ fontSize: 20, fontFamily: fonts.PoppinsExtraBold }}>Covid</Text>
                                <Text style={{ fontSize: 20, fontFamily: fonts.PoppinsRegular }}> Help</Text>
                                <View style={{ width: 100, marginLeft: 10, height: 1, marginTop: 12, backgroundColor: 'gray' }}></View>
                            </View>


                            <View style={{ marginTop: 10 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("WebPage", { title: this.state.covidTitle, link: this.state.covidLink })}
                                    style={{ marginHorizontal: 5, }}>
                                    <Image source={{ uri: this.state.covidImage }} resizeMode={'stretch'}
                                        style={{ height: 130, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    </Image>
                                </TouchableOpacity>
                            </View>
                        </> : null
                    }

                    <View style={{ flexDirection: 'row', alignContent: 'center', paddingHorizontal: 15, marginTop: 15 }}>
                        <Text style={{ fontSize: 20, fontFamily: fonts.PoppinsExtraBold }}>Best</Text>
                        <Text style={{ fontSize: 20, fontFamily: fonts.PoppinsRegular }}> Offers</Text>
                        <View style={{ width: 100, marginLeft: 10, height: 1, marginTop: 12, backgroundColor: 'gray' }}></View>
                    </View>
                    <FlatList
                        style={{ marginTop: 0, backgroundColor: Colors.white, paddingHorizontal: 10 }}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.arrOffers}
                        horizontal
                        renderItem={this.offersRender}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    />

                    <View style={{ flexDirection: 'row', alignContent: 'center', paddingHorizontal: 15, marginTop: 15 }}>
                        <Text style={{ fontSize: 20, fontFamily: fonts.PoppinsExtraBold }}>Feature</Text>
                        <Text style={{ fontSize: 20, fontFamily: fonts.PoppinsRegular }}> Service</Text>
                        <View style={{ width: 100, marginLeft: 10, marginTop: 12, height: 1, backgroundColor: 'gray' }}></View>
                    </View>
                    <FlatList
                        style={{ marginTop: 0, backgroundColor: Colors.white, paddingHorizontal: 10 }}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.arrService}
                        horizontal
                        renderItem={this.fetureRender}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ScrollView>
            </SafeAreaView>
        )
    }

    fetureRender = ({ item }) => {
        return (
            <View style={{ marginTop: 10 }}>
                <TouchableOpacity onPress={() => this.goToCategoryScreen(item)}
                    style={{ marginHorizontal: 5, }}>
                    <Image source={{ uri: item.banner }} resizeMode={'cover'}
                        style={{ height: 130, width: 250, alignItems: 'center', justifyContent: 'center' }}>
                    </Image>
                </TouchableOpacity>
            </View>
        )
    }

    offersRender = ({ item }) => {
        return (
            <View style={{ marginTop: 10 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Offer")}
                    style={{ marginHorizontal: 5, }}>
                    <Image source={{ uri: item.banner }} resizeMode={'cover'}
                        style={{ height: 130, width: 250, alignItems: 'center', justifyContent: 'center' }}>
                    </Image>
                </TouchableOpacity>
            </View>
        )
    }
};


const style = StyleSheet.create({
   
    searchboxView: {
        alignSelf: 'center',
        borderWidth:0.5,
        width: wp(90),
        marginTop:hp(3),
        marginBottom: hp(1),
        flexDirection: 'row',
        backgroundColor: "#ffffff",
        paddingLeft: wp(5),
        paddingTop: hp(1),
        borderRadius: 30,
        height:hp(5),

    },
    searchbox: {
        fontSize: 14,
        color: '#b2b9c0',
        width: wp(75),
        marginLeft: wp(3)
    },
})