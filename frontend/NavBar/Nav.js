import React from "react";
import {createBottomTabNavigator}from "@react-navigation/bottom-tabs"
import HomeScreen from "../component/HomeScreen"
import ProfileScreen from "../component/profileScreen"
import PostScreen from "../component/postScreen";


const Tab =createBottomTabNavigator()

const Tabs = () => {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Home"component={HomeScreen} />
      <Tab.Screen name="Post"component={PostScreen} />
      <Tab.Screen name="Profile"component={ProfileScreen} />
    </Tab.Navigator>
  )
};

export default Tabs