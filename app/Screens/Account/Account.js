// AppHeader({ ...this.props.navigation, leftTitle: 'Account',
// hideLeftBackIcon: false, })
import React from 'react';
import { Text, View, ScrollView,Share, FlatList, Image, TouchableOpacity, SafeAreaView, } from 'react-native';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import styles from './AccountStyles';
import IconInput from '../../Comman/GInput';
import KeyboardScroll from '../../Comman/KeyboardScroll';
import AppHeader from '../../Comman/AppHeader';
import fonts from '../../Assets/fonts';
import Helper from '../../config/Helper';
import { handleNavigation } from '../../navigation/Navigation';
import Constant from '../../config/Constant';

export default class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrItem: [

                {
                    page:"ProductCart",
                    title:"Product Cart",
                    icon: images.active_bookings,
                     disable:true
                },

                {
                    page:"Profile",
                    title: 'Profile',
                    icon: images.metro_profile,
                },
                {
                    page:"ChangePassword",
                    title: 'Change Password',
                    icon: images.change_password,
                },
                {
                    //page:"AddAddress",
                    page:"SelectAddress",
                    title: 'Address Book',
                    icon: images.address_book,
                 }, 
                 {
                    page:"ProductList",
                    title: 'Product List',
                    icon: images.active_bookings,
                     disable:true
                 }, 
                {
                    page:"RatingReview",
                    title: 'Rewards',
                    icon: images.star_full,
                     disable:true
                },
                {
                    page:"WebPage",
                    title: 'Privacy Policy',
                    icon: images.privacy,
                     disable:true
                },
                {
                    page:"ContactUs",
                    title: 'Contact Us',
                    icon: images.support,
                     disable:true
                },
                {
                    page:"WebPage",
                    title: 'Terms & Conditions',
                    icon: images.terms,
                     disable:true
                }, {
                    page:"WebPage",
                    title: 'About',
                    icon: images.works,
                     disable:true
                },
                {
                    page:"",
                    title: 'Refer & Earn',
                    icon: images.refer,
                     disable:true
                },
                 {
                    page:"Share",
                    title: 'Share',
                    icon: images.share,
                     disable:true
                },
                {   
                    page:"ContactUs",
                    title: 'Support & Contact',
                    icon: images.support,
                     disable:true
                }, 
                {
                    page:"FAQ",
                    title: 'FAQ',
                    icon: images.faq,
                     disable:true
                },
                 {
                    page:"ContactUs",
                    title: 'Report An Issue',
                    icon: images.bug_report,
                     disable:true
                },
                {
                    page:"",
                    title: 'Version Number',
                    icon: images.versions,
                     disable:true
                },
                {
                    page:"LogOut",
                    title: 'LogOut',
                    icon: images.logout,
                },
            ],


        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Accounts',
            bellIcon: false, settingsIcon: false, profileIcon: false,
            hideLeftBackIcon: false,
         
        })
    }

    settingIconClick() {
        this.props.navigation.navigate('SettingsScreen')
    }

    clickAction(val, title){
       
        if (val == 'Share'){
         this.onShare()
        }else if(val == "LogOut"){
            
            Helper.removeItemValue('user_details')
            Helper.userData = {}
            Helper.user_id = ''
           //this.props.navigation.goBack()
           this.props.navigation.navigate('LoginScreen')
          
        } 
        else if(title == "FAQ"){
            this.props.navigation.navigate("WebPage",{title : "FAQ", link : Constant.faq})
        }
        else if(title == "Contact Us"){
            this.props.navigation.navigate("WebPage",{title : "Contact Us", link : Constant.contactUs})
        }
        else if(title == "About"){
            this.props.navigation.navigate("WebPage",{title : "About", link : Constant.about})

        }else if(title == "Terms & Conditions"){
            this.props.navigation.navigate("WebPage",{title : "Terms & Conditions", link : Constant.TermsAndCondition})

        }else if(title == "Privacy Policy"){
            this.props.navigation.navigate("WebPage",{title : "Privacy Policy", link : Constant.privacy})

        }
        else{
            this.props.navigation.navigate(val,{title : title , })
        }
       
    }

     onShare = async () => {
        try {
          const result = await Share.share({
            message:
"https://play.google.com/store/apps/details?id=com.ayat",
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
    }

    _renderUpComingItem = ({ item, index }) => {
       // console.log(item);
        return (
            <View style={{ marginHorizontal: 16 }}>
                {index == 0 ? null :
                    <View style={{ height: 1, backgroundColor: '#C5C5C5', width: '100%', marginBottom: 15, marginTop: 15, }}></View>
                }
                <TouchableOpacity disabled={item.disable} onPress={() => {this.clickAction(item.page, item.title) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image resizeMode={'contain'} style={{ height: 23, width: 22, }} source={item.icon}></Image>
                        <Text style={{ marginLeft: 10, fontFamily: fonts.PoppinsExtraBold, color: '#555555', fontSize: 15, fontWeight: 'bold' }}>{item.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }


    render() {
        return (
            <View style={{ flex: 1,backgroundColor:'white', paddingTop: 10, paddingBottom: 10 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.arrItem}
                    renderItem={this._renderUpComingItem}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }

};





