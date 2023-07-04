import React from 'react';
import { Text, View, ScrollView, Image, ImageBackground, StyleSheet, TextInput, Dimensions, TouchableOpacity, SafeAreaView, Keyboard, } from 'react-native';
import styles from './ContactUsStyles';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import IconInput from '../../Comman/GInput';
import fonts from '../../Assets/fonts';
import AppHeader from '../../Comman/AppHeader';
import RNPickerSelect from '../../Comman/CommonPicker'
import ApiCallHelper from '../../config/ApiCallHelper';
import Helper from '../../config/Helper';
import Constant from '../../config/Constant';


const DeviceH = Dimensions.get('window').height;
const DeviceW = Dimensions.get('window').width;
export default class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: "",
            decription: "",
            data : this.props.route.params?.data,


            arrLanguage: [
                { label: 'Select', value: '-1' },
                { label: 'Issue with technician', value: 'Issue with technician' },
                { label: 'Issue with service provider', value: 'Issue with service provider' },
                { label: 'Payment issue', value: 'Payment issue' },
                { label: 'Coupon code issue', value: 'Coupon code issue' },
                { label: 'App issue', value: 'App issue' },
                { label: 'Website Issue', value: 'Website Issue' },
                { label: 'Suggestion', value: 'Suggestion' },
                { label: 'Other', value: 'Other' },
            ],
            language_code: '-1'
        }
        AppHeader({ ...this.props.navigation, leftTitle: this.props.route.params?.title })

    }

    componentDidMount() {
  console.log("data--------------", JSON.stringify(this.state.data));
    }


    // https://easybuddy.in/stagging/api/auth/raise-issues

    // booking_id:76050
    // user_id:77
    // issue_type:Not Taking a Services Tools
    // issue_desc:Not Taking a Services Tools
    // email:kahifhussain146@gmail.com


    submit() {
Keyboard.dismiss()
        if(this.state.language_code == "-1"){
            Helper.showToast("Please select issue type")
            return
        }
        if(this.state.decription == ""){
            Helper.showToast("Please enter description")
            return
        }

        var data = {}
        data.user_id = Helper.userData.id
        data.booking_id = this.props.route.params?.data?.booking_id
        data.issue_type = this.state.language_code
        data.issue_desc = this.state.decription
        //data.email = ""
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.raiseIssues, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                Helper.showToast(response.message)
              this.props.navigation.goBack()
            } else { 
                Helper.showToast(response.message)
            }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }



    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>

                    <View style={{ marginVertical: 10, marginTop: 15, marginHorizontal: 16 }}>

                    
              
              {this.props.route.params?.title == "Raise issue" ? null : 
              <>
                        <Text style={{ color: Colors.black, marginTop: 0, fontSize: fonts.fontSize14, fontFamily: fonts.RoBoToBold_1, fontWeight: 'bold' }}>Enter An Email Id</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10, backgroundColor: '#F4EDED', borderRadius: 10, paddingHorizontal: 8, }}>
                            <TextInput
                                style={{ fontSize: 15, textAlignVertical: 'top', flex: 1, fontFamily: fonts.PoppinsBold, fontWeight: 'bold', marginLeft: 0 }}
                                placeholder={''}
                                placeholderTextColor={'#000'}
                                value={this.state.emailId}
                                onChangeText={(emailId) => this.setState({ emailId })}
                            // value={value}
                            />
                        </View>
                        </>
    }
                        <Text style={{ color: Colors.black, fontSize: fonts.fontSize14, marginTop: 20, fontFamily: fonts.RoBoToBold_1, fontWeight: 'bold' }}>Select An Issue Type</Text>

                        <View style={{ backgroundColor: '#F4EDED', marginTop: 10, paddingHorizontal: 5 }}>
                            <RNPickerSelect
                                //label={LanguagesIndex.translate('LanguagePreference')}
                                items={this.state.arrLanguage}
                                placeHolder={{}}
                                onValueChange={(value) => { this.setState({ language_code: value }) }}
                                selectValue={this.state.language_code}
                                useNativeAndroidPickerStyle={false}
                                style={pickerSelectStyles}
                            />
                        </View>

                        <Text style={{ color: Colors.black, marginTop: 20, fontSize: fonts.fontSize14, fontFamily: fonts.RoBoToBold_1, fontWeight: 'bold' }}>Enter Description</Text>
                        <View style={{ flexDirection: 'row', height: 130, marginTop: 10, backgroundColor: '#F4EDED', borderRadius: 10, paddingHorizontal: 8, }}>
                            <TextInput
                                style={{ fontSize: 15, textAlignVertical: 'top', flex: 1, fontFamily: fonts.PoppinsBold, fontWeight: 'bold', marginLeft: 0 }}
                                placeholder={''}
                                placeholderTextColor={'#000'}
                                value={this.state.decription}
                                onChangeText={(decription) => this.setState({ decription })}
                            // value={value}
                            />
                        </View>

                    </View>


                    <View style={{ marginVertical: 10, marginTop: 33, marginHorizontal: 16 }}>
                        <GButton
                            Text='Submit'
                            width={'50%'}
                            height={50}
                            borderRadius={25}
                         onPress={() => { this.submit() }}
                        // onPress={() => { this.login_Submit() }}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

};

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

