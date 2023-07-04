import { StyleSheet } from 'react-native';
import fonts from '../../Assets/fonts';
import Colors from '../../Assets/Colors';


export default LoginScreenStyles = StyleSheet.create({
    safe_area_view: {
        flex: 1
    },
    imag_back_ground: {
        flex: 1
    },
    log_view: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    logo_img: {
        width: 50,
        height: 50
    },
    welcome_text_view:{
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop:5 
    },
    welcome_text: {
        color: '#969696', 
        fontSize: fonts.fontSize14,
        fontFamily:fonts.RoBoToBold_1
    },
    input_btn_parent_view:{
        marginTop:20
    },
    input_view:{
        marginHorizontal: 25
    },
    forgot_text_view:{
        marginHorizontal: 16 ,
        marginTop:5
    },
    forgot_touch:{
        alignSelf: 'center'
    },
    forgot_text:{
        fontSize: fonts.fontSize12, 
        lineHeight: 14, 
        color: '#969696',
        fontFamily:fonts.RoBoToMedium_1
    },
    login_btn_view:{
        marginVertical: 10, 
        marginTop: 15, 
        marginHorizontal: 25
    },
    or_view:{
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row', 
        marginVertical: 10
    },
    or_line_view:{
        backgroundColor: Colors.warmGreyTwo, 
        height: 1, 
        width: 15
    },
    or_text:{
        marginHorizontal: 5, 
        fontSize: fonts.fontSize12, 
        color: Colors.warmGreyTwo,
        fontFamily:fonts.RoBoToBold_1
    },
    social_fb_apple_view:{
        marginVertical: 10, 
        marginHorizontal: 16
    },
    do_not_text_view:{
        marginVertical: 10, 
        marginHorizontal: 16,
        alignItems:'center'
    },
    do_not_text:{
        lineHeight:14,
        fontSize:fonts.fontSize12,
        color:Colors.black,
        fontFamily:fonts.RoBoToRegular_1
    },
    sign_up_text:{
        fontSize:fonts.fontSize12,
        color:Colors.azul,
        lineHeight:14,
        fontFamily:fonts.RoBoToMedium_1
    },


   
});