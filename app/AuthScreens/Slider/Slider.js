import React from 'react';
import { Text, View, ScrollView, Image, StyleSheet, SafeAreaView,TouchableOpacity } from 'react-native';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
// import IconInput from '../../Comman/GInput';
import fonts from '../../Assets/fonts';
import { handleNavigation } from '../../navigation/Navigation';
import Helper from '../../config/Helper';



export default class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    // goToLogin() {
    //     this.props.navigation.navigate('LoginScreen')
    // }
    componentDidMount(){
        Helper.requestLocationPermission()
    }
    logInClick = () => {
        handleNavigation({type:'push',page:'LoginScreen',navigation:this.props.navigation})
    }

    bookserviceClick = () => {
        handleNavigation({type:'push',page:'SignUpScreen',navigation:this.props.navigation})
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>
                    {/* <View style={{ alignItems: 'flex-end', marginTop: 30, marginHorizontal: 16 }}>
                        <TouchableOpacity
                          onPress={() => { this.logInClick() }}
                           style={{ backgroundColor: '#FCFBFB', borderWidth: 0.5, borderColor: '#D4D4D4',
                            paddingHorizontal: 20, paddingVertical: 5, borderRadius: 15
                            }}>
                            <Text style={{
                                color: Colors.black, fontSize: 12,
                                fontFamily: fonts.PoppinsLight,
                            }}>Skip</Text>
                        </TouchableOpacity>
                    </View> */}

                    <View style={{ alignItems: 'center', marginTop: '15%' }}>
                        <Text style={{ color: Colors.black, fontSize: 24, fontFamily: fonts.PoppinsBold, }}>Being You is Great.</Text>
                    </View>

                    <View style={{ alignItems: 'center', marginVertical: 5, }}>
                        <View style={{ width: '100%', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: 15, color: Colors.black, fontFamily: fonts.PoppinsRegular }}>Create a account to set up your profile.</Text>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', marginTop: '12%' }}>
                        <Image source={images.account} style={{ height: 200, width: 200 }} resizeMode={'contain'} />
                    </View>
{/* 
                    <View style={{ alignItems: 'center', marginTop: '15%', flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{
                            backgroundColor: Colors.black, height: 10, width: 10, borderRadius: 10 / 2,
                            marginHorizontal: 5
                        }}></View>
                        <View style={{ backgroundColor: '#FCFBFB', height: 10, width: 10, borderRadius: 10 / 2, borderColor: '#D4D4D4', borderWidth: 0.5, marginHorizontal: 5 }}></View>
                        <View style={{backgroundColor: '#FCFBFB', height: 10, width: 10, borderRadius: 10 / 2,borderColor: '#D4D4D4', borderWidth: 0.5, marginHorizontal: 5
                        }}></View>

                    </View> */}



                    <View style={{ alignItems: 'center', marginTop: '20%', justifyContent: 'center' }}>

                        <TouchableOpacity
                        onPress={() => { this.bookserviceClick() }}
                         style={{backgroundColor:'#E9B26A',paddingHorizontal:50,
                        paddingVertical:10,borderRadius:20}}>
                            <Text style={{color:Colors.white,fontSize:14,fontFamily:fonts.PoppinsSemiBold}}>NEXT</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

};






