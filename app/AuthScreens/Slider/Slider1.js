import React from 'react';
import { Text, View, ScrollView, Image, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
// import IconInput from '../../Comman/GInput';
import fonts from '../../Assets/fonts';
import { handleNavigation } from '../../navigation/Navigation';



export default class Slider1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    signup_Submit() {

    }

    // goToLogin() {
    //     this.props.navigation.navigate('LoginScreen')
    // }

   


    logInClick = () => {
        handleNavigation({type:'push',page:'LoginScreen',navigation:this.props.navigation})
    }

    servicehomeClick = () => {
        handleNavigation({type:'push',page:'Slider2',navigation:this.props.navigation})
    }
    

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>


                    {/* <View style={{ alignItems: 'flex-end', marginTop: 30, marginHorizontal: 16 }}>
                        <TouchableOpacity
                         onPress={() => { this.logInClick() }}
                          style={{
                            backgroundColor: '#FCFBFB', borderWidth: 0.5, borderColor: '#D4D4D4',
                            paddingHorizontal: 20, paddingVertical: 5, borderRadius: 15
                        }}>
                            <Text style={{
                                color: Colors.black, fontSize: 12,
                                fontFamily: fonts.PoppinsLight,
                            }}>Skip</Text>
                        </TouchableOpacity>

                    </View> */}

                    <View style={{ alignItems: 'center', marginTop: '15%' }}>
                        <Text style={{
                            color: Colors.black, fontSize: 24,
                            fontFamily: fonts.PoppinsBold, textAlign:'center',marginHorizontal:'5%'
                        }}>Your demand, Our command.</Text>
                    </View>


                    <View style={{ alignItems: 'center', marginVertical: 5, }}>
                        <View style={{ marginHorizontal:50, justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: 14,
                                color: Colors.black, fontFamily: fonts.PoppinsRegular
                            }}>Choose and Book</Text>
                        </View>

                    </View>


                    <View style={{ alignItems: 'center', marginTop: '12%' }}>
                        <Image source={images.technicalsupport} style={{ height: 200, width: 200 }} resizeMode={'contain'} />
                    </View>

                    <View style={{ alignItems: 'center', marginTop: '15%', flexDirection: 'row', justifyContent: 'center' }}>

                        <View style={{
                            backgroundColor: '#FCFBFB', height: 10, width: 10, borderRadius: 10 / 2,
                            borderColor: '#D4D4D4', borderWidth: 0.5, marginHorizontal: 5
                        }}></View>

                        <View style={{
                            backgroundColor: Colors.black, height: 10, width: 10, borderRadius: 10 / 2,
                            marginHorizontal: 5
                        }}></View>


                        <View style={{
                            backgroundColor: '#FCFBFB', height: 10, width: 10, borderRadius: 10 / 2,
                            borderColor: '#D4D4D4', borderWidth: 0.5, marginHorizontal: 5
                        }}></View>

                    </View>



                    <View style={{ alignItems: 'center', marginTop: '20%', justifyContent: 'center' }}>

                        <TouchableOpacity
                        onPress={() => { this.servicehomeClick() }}
                         style={{
                            backgroundColor: '#E9B26A', paddingHorizontal: 50,
                            paddingVertical: 10, borderRadius: 20
                        }}>
                            <Text style={{ color: Colors.white, fontSize: 14, fontFamily: fonts.PoppinsSemiBold }}>NEXT</Text>
                        </TouchableOpacity>
                    </View>


                </ScrollView>
            </SafeAreaView>
        )
    }

};






