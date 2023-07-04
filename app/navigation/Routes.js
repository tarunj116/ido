import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "../Screens/Splash";
import { View, Text, Image } from "react-native";
import Colors from "../Assets/Colors";
import { images } from "../Assets/imagesUrl";

//care home manager
import SplashScreen from "../AuthScreens/SplashScreen/SplashScreen";
import AfterSplash from '../AuthScreens/AfterSplash/AfterSplash';
import LoginScreen from '../AuthScreens/LoginScreen/LoginScreen';
import ForgotPasswordScreen from '../AuthScreens/ForgotPasswordScreen/ForgotPasswordScreen';
import ChangePasswordScreen from '../AuthScreens/ChangePasswordScreen/ChangePasswordScreen';

import SignUpScreen from '../Screens/SignUpScreen/SignUpScreen';
import BottomTab from '../navigation/BottomTab';



import SettingsScreen from "../AuthScreens/SettingsScreen/SettingsScreen";


import VerifyingDetails from "../AuthScreens/VerifyingDetails/VerifyingDetails";
import Slider from "../AuthScreens/Slider/Slider";
import Slider1 from "../AuthScreens/Slider/Slider1";
import Slider2 from "../AuthScreens/Slider/Slider2";
import EnterTheverificationcode from '../Screens/EnterTheverificationcode/EnterTheverificationcode';
import Verified from '../Screens/EnterTheverificationcode/Verified';
import UserProfile from '../Screens/UserProfile/UserProfile';
import SelectPaymentMode from '../Screens/SelectPaymentMode/SelectPaymentMode';
import RatingReview from '../Screens/RatingReview/RatingReview';
import VerificationCodeSend from '../AuthScreens/VerificationCodeSend/VerificationCodeSend';
import Profile from '../Screens/Profile';
import ChangePassword from '../Screens/ChangePassword';

import Category from '../Screens/Category/Category';
import AddService from '../Screens/AddService/AddService';
import Search from '../Screens/HomeScreen/search';
import SelectAddress from '../Screens/SelectAddress/SelectAddress';
import PaymentReview from '../Screens/PaymentReview/PaymentReview';
import ContactUs from '../Screens/ContactUs/ContactUs';
import ReportanIssue from '../Screens/ReportanIssue/ReportanIssue';
import AddAddress from '../Screens/AddAddress/AddAddress';
import WebPage from '../Screens/WebPage';
import FAQ from '../Screens/FAQ'
import CategoryDetails from '../Screens/CategoryDetails'
import ListingDetails from '../Screens/ListingDetails';
import Offer from "../Screens/Offer";
import ProductDetails from "../Screens/ProductDetails";
import SelectSlot from '../Screens/SelectSlot/SelectSlot';
import BookingReview from '../Screens/BookingReview/BookingReview';
import AddProduct from '../Screens/AddProduct/AddProduct';
import BookingDetails from '../Screens/Booking/BookingDetails'
import ProductList from '../Screens/ProductList/ProductList'
import ProductCart from "../Screens/ProductList/ProductCart";


const Stack = createStackNavigator();
function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="AddAddress"
        initialRouteName="SplashScreen"
      // initialRouteName="AfterSplash"
      >

        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="AfterSplash"
          component={AfterSplash}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Slider"
          component={Slider}
          options={{ headerShown: false }}
        />

        {/* <Stack.Screen
          name="Slider1"
          component={Slider1}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Slider2"
          component={Slider2}
          options={{ headerShown: false }}
        /> */}

        <Stack.Screen
          name="VerifyingDetails"
          component={VerifyingDetails}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Verified"
          component={Verified}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="EnterTheverificationcode"
          component={EnterTheverificationcode}
        // options={{ headerShown: false }}
        />

        <Stack.Screen
          name="VerificationCodeSend"
          component={VerificationCodeSend}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SelectPaymentMode"
          component={SelectPaymentMode}
        // options={{ headerShown: false }}
        />

        <Stack.Screen
          name="BookingDetails"
          component={BookingDetails}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="Offer"
          component={Offer}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="RatingReview"
          component={RatingReview}
        // options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ProductList"
          component={ProductList}
        // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductCart"
          component={ProductCart}
          />

        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
        />
          <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }} />


        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
        />


        <Stack.Screen
          name="Category"
          component={Category}
        />

        <Stack.Screen
          name="AddService"
          component={AddService}
        />

        <Stack.Screen
          name="SelectAddress"
          component={SelectAddress}
        />

        <Stack.Screen
          name="PaymentReview"
          component={PaymentReview}
        />

        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
        />

        <Stack.Screen
          name="ReportanIssue"
          component={ReportanIssue}
        />

        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
        />
        <Stack.Screen
          name="WebPage"
          component={WebPage}
        />
        <Stack.Screen
          name="FAQ"
          component={FAQ}
        />
        <Stack.Screen
          name="CategoryDetails"
          component={CategoryDetails}
        />
        <Stack.Screen
          name="ListingDetails"
          component={ListingDetails}
        />


        <Stack.Screen
          name="SelectSlot"
          component={SelectSlot}
        />


        <Stack.Screen
          name="BookingReview"
          component={BookingReview}
        />


        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Routes;
