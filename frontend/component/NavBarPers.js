import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
import Wrapper from "./Wrapper";
import post from './post';
import PersonnalUser from "./PersonnalUser";
import Chat from "./Chat";
import Challenge from "./Challenge";

const homeName = 'Home';
const add = 'Add';
const chat = 'Chat';
const profile = 'Profile';
const challenge = 'star';

const NavBarPers = () => {
    return (
        <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'grey',
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let routeName = route.name;
                    if (routeName === homeName) {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (routeName === add) {
                        iconName = focused ? 'add-circle' : 'add-circle-outline'
                    } else if (routeName === chat) {
                        iconName = focused ? 'chatbox' : 'chatbox-outline' 
                    } else if (routeName === profile) {
                        iconName = focused ? 'person' : 'person-outline'
                    } else if (routeName === challenge) {
                        iconName = focused ? 'trophy' : 'trophy-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                },
            })}
        >
            <Tab.Screen name={homeName} component={Wrapper} options={{ headerShown: false }} />
            <Tab.Screen name={chat} component={Chat} options={{ headerShown: false }} />
            <Tab.Screen name={add} component={post} options={{ headerShown: false }} />
            <Tab.Screen name={challenge} component={Challenge} options={{ headerShown: false }} />
            <Tab.Screen name={profile} component={PersonnalUser} options={{ headerShown: false }} />
         
            
        </Tab.Navigator>
    );
};

export default NavBarPers;
