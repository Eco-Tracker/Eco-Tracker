import * as React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab=createBottomTabNavigator();
import ProfHomePage from "./ProfHomePage";
import AddEvent from './AddEvent'
import ProfesionnalUser from './ProfesionnalUser'

const homeName='Home';
const add='add';
const profile='Profile';
const NavBar=()=>{
    return (  
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({route})=>({
                    tabBarActiveTintColor:'green',
                    tabBarInactiveTintColor:'grey',
                    tabBarShowLabel:false,
                    tabBarHideOnKeyboard:true,
                    tabBarIcon:({focused,color,size})=>{
                        let iconName;
                        let routeName=route.name;
                        if(routeName===homeName){
                            iconName=focused ? 'home' : 'home-outline'
                        }
                        else if(routeName===add){
                            iconName=focused ? 'add-circle' : 'add-circle-outline'
                        }
                        else if(routeName===profile){
                            iconName=focused ? 'person' : 'person-outline'
                        }
                        
                        return <Ionicons name={iconName} size={size} color={color} />
                    }
                })}
                >

                <Tab.Screen name={homeName} component={ProfHomePage} options={{ headerShown: false }}/>
                <Tab.Screen name={add} component={AddEvent} options={{ headerShown: false }}/>
                <Tab.Screen name={profile} component={ProfesionnalUser} options={{ headerShown: false }}/>

                
            </Tab.Navigator>
        
    )
}

export default NavBar;