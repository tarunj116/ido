import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, SafeAreaView, TextInput, DeviceEventEmitter } from 'react-native';
import styles from './RatingReviewStyles';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import AppHeader from '../../Comman/AppHeader';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Constant from '../../config/Constant';
import Helper from '../../config/Helper';
import ApiCallHelper from '../../config/ApiCallHelper';



export default class RatingReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews : "",
            rating  : 0,
            serviceRating:0,
            bookingData : this.props.route.params?.bookingData,
            ServiceDesc:""
        }
        AppHeader({ ...this.props.navigation, leftTitle: 'Rating & Review', })
    }

    componentDidMount(){
        console.log("hookingData------------",this.state.bookingData);
    }

    ratingCompleted=(rating)=> {
        this.setState({rating : rating.toString()})
      //  console.log("Rating is: " + rating)
    }

    ratingService=(rating)=> {
        this.setState({serviceRating : rating.toString()})
       // console.log("Rating is: " + rating)
    }

    submitRating() {
        if(this.state.rating == ""){
            Helper.showToast("Please select rating star")
            return
        }
        if(this.state.reviews == ""){
            Helper.showToast("Please enter review")
            return
        }
        var data = {}
        data.user_id = Helper.userData.id
        data.booking_id = this.props.route.params?.bookingData?.booking_id
        data.staff_id = this.props.route.params?.bookingData?.assign_to_staff
        data.rating = this.state.rating
        data.title = this.state.reviews
        data.service_id = this.props.route.params.bookingData?.service_ids
        data.service_ratings = this.state.serviceRating
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.saveRatings, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                Helper.showToast(response.message)
                DeviceEventEmitter.emit("Rating","Done")
              this.props.navigation.goBack()
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>
                    <View style={{ marginHorizontal: 25, marginTop: 5 }}>
                        <Text style={{ color: Colors.black, fontSize: fonts.fontSize15, fontFamily: fonts.PoppinsExtraBold, fontWeight: 'bold'}}>Give Rating to the Technician</Text>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <AirbnbRating
                            showRating={false}
                            selectedColor={'#000'}
                            count={5}
                            onFinishRating={this.ratingCompleted}
                            defaultRating={1}
                            // isDisabled={true}
                            size={30} />
                    </View>

                    <View style={{ marginHorizontal: 25, marginTop: 15 }}>
                        <Text style={{ color: Colors.black, fontSize: fonts.fontSize15, fontFamily: fonts.PoppinsExtraBold, fontWeight: 'bold'}}>Give Rating to the Service</Text>
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <AirbnbRating
                            showRating={false}
                            selectedColor={'#000'}
                            count={5}
                            onFinishRating={this.ratingService}
                            defaultRating={1}
                            // isDisabled={true}
                            size={30} />

                    </View>
                    

                  
                  
                    <View style={{ marginHorizontal: 25, marginTop: 15 }}>
                        <Text style={{ color: Colors.black, fontSize: fonts.fontSize15, fontFamily: fonts.RoBoToMedium_1,
                            fontWeight: 'bold' }}>Review</Text>
                    </View>
                    <View style={{marginVertical: 10,marginHorizontal: 25,
                        backgroundColor: '#F4EDED', borderRadius: 5,
                        borderColor: Colors.whiteTwo, elevation: 1.5,
                        height: 130, shadowOpacity: 0.5,
                        shadowColor: '#172C3326',
                    }}>
                        <TextInput
                            multiline
                            placeholder="Enter here..."
                            value={this.state.reviews}
                            onChangeText={(reviews) => this.setState({ reviews })}
                            style={{ textAlignVertical: 'top', textAlign: 'justify', }}
                        />
                    </View>


                   
                    {/* <View style={{ marginHorizontal: 25, marginTop: 15 }}>
                        <Text style={{ color: Colors.black, fontSize: fonts.fontSize15, fontFamily: fonts.RoBoToMedium_1,
                            fontWeight: 'bold' }}>Review</Text>
                    </View>
                    <View style={{marginVertical: 10,marginHorizontal: 25,
                        backgroundColor: '#F4EDED', borderRadius: 5,
                        borderColor: Colors.whiteTwo, elevation: 1.5,
                        height: 130, shadowOpacity: 0.5,
                        shadowColor: '#172C3326',
                    }}>
                        <TextInput
                            multiline
                            placeholder="Enter here..."
                            value={this.state.ServiceDesc}
                            onChangeText={(ServiceDesc) => this.setState({ ServiceDesc })}
                            style={{ textAlignVertical: 'top', textAlign: 'justify', }}
                        />
                    </View> */}


                    <View style={styles.update_btn_view}>
                        <GButton
                            Text='Submit'
                            width={'40%'}
                            height={45}

                            borderRadius={22.5}
                            onPress={() => { this.submitRating() }}
                        // onPress={() => { this.login_Submit() }}
                        />
                    </View>

                </ScrollView>
            </SafeAreaView>
        )
    }

};
