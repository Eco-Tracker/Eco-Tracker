import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const Tab = createBottomTabNavigator();
import ProfHomePage from "./ProfHomePage";
import AddEvent from './AddEvent';
import ProfesionnalUser from './ProfesionnalUser';
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
                    let iconComponent;
                    let routeName = route.name;
                    if (routeName === homeName) {
                        iconComponent = focused ? <EvilIcons name="navicon" size={size} color={color} /> : <EvilIcons name="navicon" size={size} color={color} />;
                    } else if (routeName === add) {
                        iconComponent = focused ? <EvilIcons name="plus" size={size} color={color} /> : <EvilIcons name="plus" size={size} color={color} />;
                    } else if (routeName === chat) {
                        iconComponent = focused ? <EvilIcons name="comment" size={size} color={color} /> : <EvilIcons name="comment" size={size} color={color} />;
                    } else if (routeName === profile) {
                        iconComponent = focused ? <EvilIcons name="user" size={size} color={color} /> : <EvilIcons name="user" size={size} color={color} />;
                    } else if (routeName === challenge) {
                        iconComponent = focused ? <EvilIcons name="trophy" size={size} color={color} /> : <EvilIcons name="trophy" size={size} color={color} />;
                    }

                    return iconComponent;
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
