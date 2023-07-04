import React from 'react';
import { Text, View, ScrollView, Image, TextInput, SafeAreaView, DeviceEventEmitter,StyleSheet } from 'react-native';
import { images } from '../Assets/imagesUrl';
import fonts from '../Assets/fonts';
import AppHeader from '../Comman/AppHeader';
import Helper from '../config/Helper'

import ApiCallHelper from '../config/ApiCallHelper'
import Constant from '../config/Constant'
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import CameraController from '../config/CameraController'
import RNPickerSelect from '../Comman/CommonPicker'


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchOnNotification: true,
            name: Helper.userData.name,
            mobile: Helper.userData.mobile,
            email: Helper.userData.email,
            dob: Helper.userData.dob,
            profileImage: Helper.userData.mobile,
            datePicker: false,gender:"",
            profile_Image: Helper.userData.profile_pic,
            genderarray: [
                { label: '', value: '' },
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
               
            ],
            arrCountry: [
                { label: '', value: '' },
                { label: 'India', value: 'India' },
                { label: 'UK', value: 'UK' },
            ],
            country: '',


            arrState: [
                { label: '', value: '' },
                { label: 'Rajastahn', value: 'Rajastahn' },
                { label: 'panjab', value: 'panjab' },
            ],
            cityState: '',

            arrCity: [
                { label: '', value: '' },
                { label: 'Jaipur', value: 'Jaipur' },
                { label: 'Ajmer', value: 'Ajmer' },
            ],
            city: '',

        }
        AppHeader({ ...this.props.navigation, leftTitle: 'Profile', borderBottomRadius: 0 })

    }

    componentDidMount() {
        console.log( Helper.userData);
      //  this.getCountry()

    }

    //  onChange(val){

    //     var dateString = moment.unix(val.nativeEvent.timestamp).format("dd/mm/yyyy");
    //      alert(dateString)
    //          console.log(val.nativeEvent.timestamp)
    //   };

    setDate = (event, date) => {
        this.setState({ dob: moment(date).format('DD-MM-YYYY'), datePicker: false })
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                {this.state.datePicker && (
                    <DateTimePicker
                        //  testID="dateTimePicker"
                        value={new Date()}
                        mode={'date'}
                        is24Hour={false}
                        display="default"
                        onChange={this.setDate}
                    // onChange={(day)=>this.onChange(day)}
                    />
                )}

                {console.log("this.state.profile_Image",this.state.profile_Image)}
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>
                    <View style={{ marginHorizontal: 20 }}>
                        <View style={{ height: 160, alignItems: 'center', justifyContent: 'center', }}>
                            <View style={{ height: 150, width: 150, alignItems: 'center', justifyContent: 'center', borderRadius: 150 / 2, borderWidth: 1 }}>
                                <Image source={this.state.profile_Image == '' ? images.user : {uri : this.state.profile_Image}}
                                 style={{ height: 150, width: 150, borderRadius: 150 / 2, }}></Image>

                                <View style={{ height: 30, width: 30, position: 'absolute', justifyContent: 'center', backgroundColor: '#000', borderRadius: 30 / 2, bottom: 10, right: 5 }}>
                                    <TouchableOpacity onPress={() => this.onPressedCamera()}>
                                        <Image source={images.camera} resizeMode={'contain'} style={{ alignSelf: 'center', height: 16, width: 16, }}></Image>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 30, backgroundColor: '#F4EDED', borderRadius: 10, paddingHorizontal: 10, alignItems: 'center' }}>
                            <Image resizeMode={'contain'} style={{ height: 20, width: 20, }} source={images.user_icon}></Image>
                            <Text style={{ fontSize: 15, fontFamily: fonts.PoppinsBold, fontWeight: 'bold', marginLeft: 10 }}>Name</Text>
                            <TextInput
                                style={{ fontSize: 15, flex: 1, fontFamily: fonts.PoppinsBold, fontWeight: 'bold', marginLeft: 30 }}
                                placeholder={''}
                                value={this.state.name}
                                placeholderTextColor={'#000'}
                                onChangeText={(name) => this.setState({ name })}
                            // value={value}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 20, backgroundColor: '#F4EDED', borderRadius: 10, paddingHorizontal: 8, alignItems: 'center' }}>
                            <Image resizeMode={'contain'} style={{ height: 20, width: 20, }} source={images.mobile}></Image>
                            <Text style={{ fontSize: 15, fontFamily: fonts.PoppinsBold, fontWeight: 'bold', marginLeft: 10 }}>Mobile</Text>
                            <TextInput
                                style={{ fontSize: 15, flexShrink: 1, fontFamily: fonts.PoppinsBold, fontWeight: 'bold', marginLeft: 30 }}
                                placeholder={''}
                                editable={false}
                                placeholderTextColor={'#000'}
                                value={this.state.mobile}
                                keyboardType={'phone-pad'}
                                onChangeText={(mobile) => this.setState({ mobile })}
                            // value={value}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 20, backgroundColor: '#F4EDED', borderRadius: 10, paddingHorizontal: 8, alignItems: 'center' }}>
                            <Image resizeMode={'contain'} style={{ height: 20, width: 20, }} source={images.email}></Image>
                            <Text style={{ fontSize: 15, fontFamily: fonts.PoppinsBold, fontWeight: 'bold', marginLeft: 10 }}>Email  </Text>
                            <TextInput
                                style={{ fontSize: 15, flex: 1, fontFamily: fonts.PoppinsBold, fontWeight: 'bold', marginLeft: 30 }}
                                placeholder={''}
                                value={this.state.email}
                                keyboardType={'email-address'}
                                placeholderTextColor={'#000'}
                                onChangeText={(email) => this.setState({ email: email })}
                            // value={value}
                            />
                        </View>

                        <TouchableOpacity onPress={() => this.setState({ datePicker: true })} style={{ flexDirection: 'row', marginTop: 20, backgroundColor: '#F4EDED', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 15 }}>
                            <Image resizeMode={'contain'} style={{ height: 20, width: 20, }} source={images.calendar}></Image>
                            <Text style={{ fontSize: 15, fontFamily: fonts.PoppinsBold, fontWeight: 'bold', marginLeft: 10 }}>D.O.B</Text>
                            <Text style={{ fontSize: 15, flexShrink: 1, fontFamily: fonts.PoppinsBold, fontWeight: 'bold', marginLeft: 30 }}>{this.state.dob}</Text>
                        </TouchableOpacity>
                        <Text style={[renderStyle.titleCss, { marginTop: 15 }]}>Gender</Text>
                        <View style={{ backgroundColor: '#F4EDED', borderRadius: 10, paddingHorizontal: 8, marginTop: 10 }}>
                            <RNPickerSelect
                                //label={LanguagesIndex.translate('LanguagePreference')}
                                items={this.state.genderarray}
                                placeHolder={{}}

                                onValueChange={(value) => { this.setState({gender:value}) }}
                                selectValue={this.state.gender}
                                useNativeAndroidPickerStyle={false}
                                style={pickerSelectStyles}
                            />
                        </View>
                        {/* <Text style={[renderStyle.titleCss, { marginTop: 15 }]}>Country</Text>
                        <View style={{ backgroundColor: '#F4EDED', borderRadius: 10, paddingHorizontal: 8, marginTop: 10 }}>
                            <RNPickerSelect
                                //label={LanguagesIndex.translate('LanguagePreference')}
                                items={this.state.genderarray}
                                placeHolder={{}}

                                onValueChange={(value) => { this.setState({gender:value}) }}
                                selectValue={this.state.gender}
                                useNativeAndroidPickerStyle={false}
                                style={pickerSelectStyles}
                            />
                        </View> */}
                        {/* <Text style={[renderStyle.titleCss, { marginTop: 15 }]}>State</Text>
                        <View style={{ backgroundColor: '#F4EDED', borderRadius: 10, paddingHorizontal: 8, marginTop: 10 }}>
                            <RNPickerSelect
                               
                                items={this.state.genderarray}
                                placeHolder={{}}

                                onValueChange={(value) => { this.setState({gender:value}) }}
                                selectValue={this.state.gender}
                                useNativeAndroidPickerStyle={false}
                                style={pickerSelectStyles}
                            />
                        </View>
                        <Text style={[renderStyle.titleCss, { marginTop: 15 }]}>City</Text>
                        <View style={{ backgroundColor: '#F4EDED', borderRadius: 10, paddingHorizontal: 8, marginTop: 10 }}>
                            <RNPickerSelect
                                items={this.state.genderarray}
                                placeHolder={{}}

                                onValueChange={(value) => { this.setState({gender:value}) }}
                                selectValue={this.state.gender}
                                useNativeAndroidPickerStyle={false}
                                style={pickerSelectStyles}
                            />
                        </View> */}
                        <TouchableOpacity onPress={() => this.updateProfile()}>
                            <View style={{ width: 200, height: 50, alignSelf: 'center', marginTop: 50, backgroundColor: 'black', borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 14, fontFamily: fonts.PoppinsExtraBold }}>SUBMIT</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }


    onPressedCamera = (data) => {
        CameraController.open((response) => {
            if (response.path) {
                console.log(response.path)
                this.setState({ profile_Image: response.path });
                this.imageUpload(response.path)

            }
        });
    }

    imageUpload(path) {

        let template = new FormData();

        template.append('user_id', Helper.userData.id);
        if (this.state.profile_Image == '' || this.state.profile_Image == null) {
        } else {
            template.append('profile_pic', {
                uri: path,
                name: 'test.jpeg',
                type: 'image/jpeg'
            });
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.putApiResponse(Constant.uploadImage, template, Constant.APIImageUploadAndroid).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("+++++++++++++++++++++++++++", JSON.stringify(response));
            if (response.status == true) {
                Helper.userData = data
                Helper.setData('user_details', data)
                DeviceEventEmitter.emit("ProfileUpdate","done")
               // this.getProfile()
                Helper.showToast(response.message)
            } else {
                Helper.showToast(response.message)
                Helper.globalLoader.hideLoader()
            }
        }).catch(err => {
            Helper.globalLoader.hideLoader();
        })

    }


    updateProfile() {
        if (this.state.name == '') {
            Helper.showToast('Please enter mobile number')
            return;
        } if (this.state.email == '') {
            Helper.showToast('Please enter email')
            return;
        } if (!Helper.EmailReg.test(this.state.email)) {
            Helper.showToast('Please enter valid email id')
            return;
        } if (!this.state.dob) {
            Helper.showToast('Please enter dob')
            return;
        }
        var data = {}
        data.user_id = Helper.userData.id
        data.name = this.state.name
        data.email = this.state.email
        data.mobile = this.state.mobile
        data.dob = this.state.dob
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.updateProfile, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            let data = response.data
            if (response.status == true) {
                Helper.userData = data
                Helper.setData('user_details', data)
                Helper.showToast(response.message)
                DeviceEventEmitter.emit("ProfileUpdate","done")
               this.props.navigation.goBack()
                // handleNavigation({ type: 'setRoot', page: 'BottomTab', navigation: this.props.navigation })
            } else {
                Helper.showToast(response.message)
            }
        }).catch(err => {
            Helper.globalLoader.hideLoader();
        })
        //  this.props.navigation.navigate('VerifyingDetails')
    }

};
const renderStyle = StyleSheet.create({
    safe_area_view: {
        flex: 1, backgroundColor: 'white'
    },
    titleCss: {
        fontSize: 15, marginTop: '5%', fontFamily: fonts.PoppinsBold, fontWeight: 'bold',
    },
    txtView: {
        flexDirection: 'column', marginTop: 10, borderColor: '#fea97a',borderWidth:0.8, borderRadius: 5, paddingHorizontal: 8,
    },
    inputCss: {
        fontSize: 15, fontFamily: fonts.PoppinsBold, fontWeight: 'bold',
    },
    loginView: {
        alignSelf: "center", marginTop: '10%', backgroundColor: 'black', width: 150, height: 45, justifyContent: 'center', borderRadius: 150 / 2
    },
    addDoc: {
        alignSelf: "center", marginTop: '10%', backgroundColor: '#fd6544', width: '100%', height: 55, justifyContent: 'center', borderRadius: 15

    },
    addDoc2: {
        alignSelf: "center", marginTop: '10%', borderColor: '#fd6544', borderWidth:0.7,width: '100%', height: 55, justifyContent: 'center', borderRadius: 15

    },
    loginTxt: {
        color: "white", fontSize: 16, alignSelf: 'center'
    },
    txtacc: {
        marginTop: 15, fontSize: 14, color: 'black'
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        height: 40,
        color: '#000',
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10,
        fontFamily: fonts.PoppinsExtraBold,
        marginLeft: 10
    },
    inputAndroid: {
        fontSize: 14,
        height: 40,
        color: '#000',
        marginRight: 20,
        marginLeft: 8,
        marginBottom: 10,
        fontFamily: fonts.PoppinsExtraBold
    },
});