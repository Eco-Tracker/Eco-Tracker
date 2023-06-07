import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, DefaultTheme } from '@react-navigation/stack';
import headerLogo from "./assets/littlelogo.png"
import {
  StatusBar,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  Platform,
} from 'react-native';



import Home from './component/Home'
import Home2 from './component/Home2'
import Loginpers from './component/Loginpers.js';
import Login from './component/Loginprof.js';
import Signuppers from './component/Signuppers.js';
import SignUpPro from './component/Signupprof.js';
import PersonnalUser from './component/PersonnalUser';
import ProfesionnalUser from './component/ProfesionnalUser';
import Nav from "../frontend/NavBar/Nav"





const Stack=createStackNavigator()


const App=() => { 



  return (

     <NavigationContainer  >
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='ProfesionnalUser' >
       <Stack.Screen   name='Home'  component={Home} />
       <Stack.Screen   name='Home2'  component={Home2}/>
       <Stack.Screen   name='Loginpers'  component={Loginpers}/>
       <Stack.Screen   name='Loginprof'  component={Login}/>
       <Stack.Screen   name='Signuppers'  component={Signuppers}/>
       <Stack.Screen   name='SignUpPro'  component={SignUpPro}/>
       <Stack.Screen   name='Nav'  component={Nav}/>
       
      

      </Stack.Navigator>
    </NavigationContainer>



  );
}


export default App;






