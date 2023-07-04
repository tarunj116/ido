import React from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, } from 'react-native';
import Colors from '../Assets/Colors';
import { images } from '../Assets/imagesUrl';
import fonts from '../Assets/fonts';
import {Picker} from '@react-native-picker/picker';

import ApiCallHelper from '../config/ApiCallHelper'
import Helper from '../config/Helper'
import Constant from '../config/Constant'

export class LeftHeader extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        let { hideLeftBackIcon, leftTitle, leftIcon, leftIconStyle, leftTitleStyle,headerBg, leftClick } = this.props;

        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                { hideLeftBackIcon ? null :
                    <TouchableOpacity
                        hitSlop={{ top: 40, left: 40, right: 40, bottom: 40 }}
                        onPress={() => leftClick()} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                        <Image
                            resizeMode={'contain'}
                            source={leftIcon ? leftIcon : images.arrow_left}
                            style={[{ height: 15, width: 18, resizeMode: 'contain' }, leftIconStyle]} />
                    </TouchableOpacity>
                }
                <Text style={[{ color: leftIcon ?  Colors.white: Colors.black , marginLeft: 10, fontSize: fonts.fontSize16, fontFamily: fonts.RoBoToMedium_1, lineHeight: 19 }, leftTitleStyle]}>{leftTitle}</Text>
            </View>
        );
    }
}

export class RightHeader extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cityList:[],
            selectedCity:''
        };

        this.getCityList()
    }

    getCityList() {
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce('city-list', {}, Constant.APIGET).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                this.setState({
                    selectedCity:response.data[0].city,
                    cityList:response.data
                })
                Helper.city = response.data[0].city;
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }


    render() {
        let {booking,giveRating, loaction,CartIcon,rightIcon, rightIconStyle, profileIcon,tintColor, profileIconClick,headerBg, bellIcon, bellIconClick,cartIconClick, settingsIcon, settingIconClick } = this.props;

        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                {profileIcon ?
                    <View style={{flexDirection:'column' ,width:170}}>
                        <Picker
                            style={{color:'#fff'}}
                            dropdownIconColor={'#FFF'}
                            selectedValue={this.state.selectedCity}
                            onValueChange={(itemValue, itemIndex) =>
                                {
                                    this.setState({
                                        selectedCity:itemValue
                                    })
                                    Helper.city = itemValue;
                                }
                            }>
                            <Picker.Item label="Location" value="" />
                            {this.state.cityList?.map((value)=>(
                                <Picker.Item label={value.name} value={value.name} />
                            ))}
                        </Picker>
                    </View>

                    : (booking == true ?
                        <TouchableOpacity onPress={()=> giveRating()} style={{backgroundColor:'black', borderRadius:16, paddingHorizontal:10, paddingVertical:5,justifyContent:"center"}}>
                        <Text style={{ fontSize:12, color: 'white'}}>Give Rating</Text>
                        </TouchableOpacity>

                        : null)
                }

                {CartIcon ?
                    <TouchableOpacity
                        onPress={() => cartIconClick()}
                        style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                        <Image
                            resizeMode={'contain'}
                            source={rightIcon ? rightIcon : images.cart}
                            style={[{ heigh:30, width: 30,tintColor:tintColor, resizeMode: 'contain', marginRight: 5 }, rightIconStyle]} />
                    </TouchableOpacity>
                    : null
                } 

                {/* {settingsIcon ?
                    <TouchableOpacity
                        onPress={() => settingIconClick()}
                        style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                        <Image
                            resizeMode={'contain'}
                            source={rightIcon ? rightIcon : images.settings_ic}
                            style={[{ height: 18.5, width: 18.5, resizeMode: 'contain', marginRight: 5 }, rightIconStyle]} />
                    </TouchableOpacity>
                    : null
                } */}
            </View>
        );
    }
}

export default AppHeader = (props) => {
    return (
        
        props.setOptions({
            headerStyle: {
                backgroundColor: props.headerBg ? Colors.black : Colors.white,
                borderBottomLeftRadius: props.borderBottomRadius ? props.borderBottomRadius : 0,
                borderBottomRightRadius: props.borderBottomRadius ? props.borderBottomRadius : 0,
                elevation: 0,
                shadowOpacity: 0
            },

            headerLeft: () =>
                <LeftHeader
                    leftClick={() => {
                        if (props.leftClick) {
                            props.leftClick()
                        } else {
                            props.goBack()
                        }
                    }}
                    leftIcon={props.leftIcon}
                    leftTitleStyle={props.leftTitleStyle}
                    leftIconStyle={props.leftIconStyle}
                    leftTitle={props.leftTitle}
                    hideLeftBackIcon={props.hideLeftBackIcon}
                    headerBg={props.headerBg}
                />,
            headerRight: () =>
                <RightHeader
                    {...props}
                />,
            headerTitle: () => <></>,
        })

    )
} 


// import React from 'react';
// import { View, Text, ImageBackground, Image, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, } from 'react-native';
// import Colors from '../Assets/Colors';
// import { images } from '../Assets/imagesUrl';
// import fonts from '../Assets/fonts';


// export class LeftHeader extends React.PureComponent {
//     constructor(props) {
//         super(props);
//         this.state = {
//         };
//     }

//     render() {
//         let { hideLeftBackIcon, leftTitle, leftIcon, leftIconStyle, leftTitleStyle, leftClick } = this.props;

//         return (
//             <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>
//                 {hideLeftBackIcon ? null :
//                     <TouchableOpacity
//                     hitSlop={{ top: 40, left: 40, right: 40, bottom: 40 }}
//                     onPress={() => leftClick()} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
//                         <Image
//                             resizeMode={'contain'}
//                             source={leftIcon ? leftIcon : images.arrow_left}
//                             style={[{ height: 18, width: 18,  }, leftIconStyle]} />
//                     </TouchableOpacity>
//                 }
//                 <Text style={[{ color: Colors.black, marginLeft: 10, fontSize: fonts.fontSize14, fontFamily: fonts.RoBoToMedium_1, lineHeight: 19 }, leftTitleStyle]}>{leftTitle}</Text>
//             </View>
//         );
//     }
// }

// export class RightHeader extends React.PureComponent {
//     constructor(props) {
//         super(props);
//         this.state = {
//         };
//     }

//     render() {
//         let { rightIcon, rightIconStyle, profileIcon, profileIconClick, bellIcon, bellIconClick, settingsIcon, settingIconClick } = this.props;

//         return (
//             <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
//                 {profileIcon ?
//                     <TouchableOpacity
//                         onPress={() => profileIconClick()}
//                         style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
//                         <Image
//                             resizeMode={'contain'}
//                             source={rightIcon ? rightIcon : images.user_edit_ic}
//                             style={[{ height: 18.5, width: 18.5, resizeMode: 'contain', marginRight: 5,tintColor:Colors.black }, rightIconStyle]} />
//                     </TouchableOpacity>
//                     : null
//                 }

//                 {bellIcon ?
//                     <TouchableOpacity
//                         onPress={() => bellIconClick()}
//                         style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
//                         <Image
//                             resizeMode={'contain'}
//                             source={rightIcon ? rightIcon : images.bell_ic}
//                             style={[{ height: 18.5, width: 18.5, resizeMode: 'contain', marginRight: 5,tintColor:Colors.black }, rightIconStyle]} />
//                     </TouchableOpacity>
//                     : null
//                 }

//                 {settingsIcon ?
//                     <TouchableOpacity
//                         onPress={() => settingIconClick()}
//                         style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
//                         <Image
//                             resizeMode={'contain'}
//                             source={rightIcon ? rightIcon : images.settings_ic}
//                             style={[{ height: 18.5, width: 18.5, resizeMode: 'contain', marginRight: 5,tintColor:Colors.black }, rightIconStyle]} />
//                     </TouchableOpacity>
//                     : null
//                 }
//             </View>
//         );
//     }
// }

// export default AppHeader = (props) => {

//     return (
//         props.setOptions({
//             headerStyle: {
//                 // backgroundColor: props.headerBg ? props.headerBg : Colors.cerulean,
//                 borderBottomLeftRadius: props.borderBottomRadius ? props.borderBottomRadius : 0,
//                 borderBottomRightRadius: props.borderBottomRadius ? props.borderBottomRadius : 0,
//                 elevation: 0,
//                 shadowOpacity: 0
//             },

//             headerLeft: () =>
//                 <LeftHeader
//                     leftClick={() => {
//                         if (props.leftClick) {
//                             props.leftClick()
//                         } else {
//                             props.goBack()
//                         }
//                     }}
//                     leftIcon={props.leftIcon}
//                     leftTitleStyle={props.leftTitleStyle}
//                     leftIconStyle={props.leftIconStyle}
//                     leftTitle={props.leftTitle}
//                     hideLeftBackIcon={props.hideLeftBackIcon}
//                 />,
//             headerRight: () =>
//                 <RightHeader
//                     {...props}
//                 />,
//             headerTitle: () => <></>,
//         })

//     )
// } 