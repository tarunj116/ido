import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput, TouchableOpacity, } from 'react-native';
import Colors from '../Assets/Colors';
import fonts from '../Assets/fonts';


class Input extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.input_container}>
                
              
                <View style={styles.input_view}>
                    <TextInput
                        secureTextEntry={this.props.secureTextEntry}
                        placeholder={this.props.placeholder}
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                        value={this.props.value}
                        onChangeText={this.props.onChangeText}
                        keyboardType={this.props.keyboardType}
                        maxLength={this.props.maxLength}
                        returnKeyType={this.props.returnKeyType}
                        blurOnSubmit={this.props.blurOnSubmit}
                        onSubmitEditing={this.props.setFocus}
                        ref={this.props.getFocus}
                        editable={this.props.inputdit}
                        placeholder={this.props.placeholder}
                        style={styles.input_style}
                        placeholderTextColor={this.props.placeholderTextColor}
                    />
                </View>
                <TouchableOpacity style={styles.image_right_view} onPress={(()=> this.props.ClickPass())}>
                    <Image
                        source={this.props.imagePathRight}
                        resizeMode='contain'
                        style={{marginRight:15, height:this.props.rightHeight, width:this.props.rightWidth,tintColor:this.props.tintColor }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

export default Input;


const styles = StyleSheet.create({
    input_style: {
        fontSize: fonts.fontSize14,
        color: Colors.warmGrey,
        height: 50,
       paddingLeft:20
    },
    input_container: {
        flexDirection: 'row',
        marginVertical: 10,
        borderRadius:25,
        backgroundColor: Colors.whiteThree,
        height: 50, 
        borderWidth:1,
        borderColor:'#E4E4E4',
        marginHorizontal:20,
    },
    input_view: {
        flex: 0.9, paddingLeft: 5, justifyContent: 'center'
    },
    image_view: {
        flex: 0.1, justifyContent: 'center', marginLeft: 18,
        
    },
    image_right_view: {
        flex: 0.1, justifyContent: 'center',
        
    }

});
