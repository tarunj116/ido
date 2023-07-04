import React from 'react';
import { Text, View, ScrollView, FlatList, Image, TouchableOpacity, SafeAreaView, } from 'react-native';
import styles from './ServiceStyle';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import ViewPager from '@react-native-community/viewpager';
import AppHeader from '../../Comman/AppHeader';
import Helper from '../../config/Helper';
import ApiCallHelper from '../../config/ApiCallHelper';
import Constant from '../../config/Constant';

export default class Service extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            notificationArr: [],
            apiResp: "0"
        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Notification', borderBottomRadius: 0,
            bellIcon: false,
            settingsIcon: false,
            headerBg: false,
            hideLeftBackIcon: false,

        })
    }

    componentDidMount() {
        this.getNotification()
    }

    getNotification() {
        let data = {
            user_id: Helper.userData.id,
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.notificationList, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                this.setState({ notificationArr: response.data, apiResp: "1" })
            } else {
                this.setState({ apiResp: "2" })

            }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }




    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>

                <View style={{ marginHorizontal: 15, flex: 1, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' }} key="1">

                    <View style={{ marginHorizontal: 15, marginTop: 10, marginBottom: 70, backgroundColor: Colors.white, padding: 5 }} key="1">

                        {this.state.apiResp == "2" ?
                            <Text style={{ fontSize: 14 }}>Notification not available</Text> :

                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.state.notificationArr}
                                renderItem={this._renderUpComingItem}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        }
                    </View>



                </View>
            </SafeAreaView>
        )
    }
    _renderUpComingItem = ({ item, index }) => {

        return (
            <View style={{marginTop:10}}>
                <Text style={{  color: '#000', fontSize: 13, fontWeight: 'bold' }}>{item.title}</Text>
                <Text style={{ fontSize: 12, color: 'gray' }}>{item.description}</Text>
           <View style={{height:0.5,marginTop:10, backgroundColor:'gray'}}></View>
            </View>
        )
    }
};
