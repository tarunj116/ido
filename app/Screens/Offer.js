import React from 'react';
import { Text, View, ScrollView, StyleSheet, TextInput, Dimensions, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import AppHeader from '../Comman/AppHeader';
import fonts from '../Assets/fonts';
import ApiCallHelper from '../config/ApiCallHelper'
import Helper from '../config/Helper'
import Constant from '../config/Constant'
import { images } from '../Assets/imagesUrl';
import Colors from '../Assets/Colors';

export default class Offer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.route.params?.type
    }
    AppHeader({ ...this.props.navigation, leftTitle: 'Offers' })
  }
  componentDidMount() {
    this.getCouponList()
  }

  componentWillUnmount() {
  }

  getCouponList() {
    let data = {
      // user_id: Helper.userData.id
    }
    Helper.globalLoader.showLoader();
    ApiCallHelper.getNetworkResponce(Constant.couponList, JSON.stringify(data), Constant.APIPost).then((response) => {
      Helper.globalLoader.hideLoader();
      console.log("arrCoupon ----------", response.data)
      if (response.status == true) {
        this.setState({ arrCoupon: response.data, couponModalVisible: true })
      } else { }
    }).catch(err => {
      Helper.globalLoader.hideLoader()
    })
  }

  couponRender = ({ item, index }) => {

    return <TouchableOpacity style={{ backgroundColor: '#fff', borderColor: '#fb5e0d', borderWidth: 1, borderStyle: 'dotted', paddingVertical: 10, borderRadius: 5, marginTop: 10 }}
    // onPress={() => this.applyCode(item?.coupon_code)}

    >

      <View style={{ paddingHorizontal: 10, }}>

        <View style={{ flexDirection: 'column', flex: 1 }}>
          <View style={{ flexDirection: 'row', }}>


            <Text style={{
              fontFamily: fonts.PoppinsSemiBold, flex: 1,
              fontSize: fonts.fontSize14, color: Colors.black, marginLeft: 10
            }}>{item?.coupon_code}</Text>


          </View>


        </View>

        <View style={{ marginLeft: 30, flexDirection: 'column' }}>
          <Text style={{
            color: Colors.warmGreyTwo, fontSize: fonts.fontSize10, fontFamily: fonts.PoppinsRegular,
          }}>{item?.description}</Text>
          {/* <TouchableOpacity>
          <Text style={{ color: 'rgb(67,146,237)', fontSize: fonts.fontSize10, fontFamily: fonts.PoppinsRegular,
                }}>T&Cs apply</Text>
                </TouchableOpacity> */}
        </View>
      </View>
    </TouchableOpacity>
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginHorizontal: widthPercentageToDP('5%'), marginVertical: heightPercentageToDP('4%') }}>
          {/* <Text style={{ fontSize: 20, fontFamily: fonts.RobotoMedium,color:'#010000' }}>Available Offers</Text> */}
          <View style={{ marginTop: 10, }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.arrCoupon} // this.state.arrCoupon
              renderItem={this.couponRender}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

});