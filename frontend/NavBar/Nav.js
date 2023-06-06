import React from "react";
import { View, Text } from 'react-native';
import { Feather, Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home3 from "../component/Home3"
import profile from "../component/profile"
import post from "../component/post"

const COLORS = {
    primary: '#A47E53', // replace with your primary color
    brown: '#A47E53', // replace with your brown color
    white: '#ffffff' // replace with your white color
};
const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    keyboardHidesTabBar: true,
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        backgroundColor: 'red',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    }
};

const Bar = createBottomTabNavigator();

function Tab (){
    return (
      <Bar.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home3"
        component={Home3} 
        options={{
          tabBarIcon: ({focused}) => (
            <Feather name='Home' size={24} color={focused ? COLORS.primary : COLORS.brown}/>
          ),
        }}
      />

      </Bar.Navigator>
    )
  
}

export default Tab
