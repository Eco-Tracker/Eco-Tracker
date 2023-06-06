import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, DefaultTheme } from '@react-navigation/stack';



import Home from './component/Home'
import Home2 from './component/Home2'
import Loginpers from './component/Loginpers.js';
import Login from './component/Loginprof.js';
import Signuppers from './component/Signuppers.js';
import SignUpPro from './component/Signupprof.js';





const Stack=createStackNavigator()


const App=() => { 



  return (

     <NavigationContainer  >
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Home'>
       <Stack.Screen   name='Home'  component={Home}/>
       <Stack.Screen   name='Home2'  component={Home2}/>
       <Stack.Screen   name='Loginpers'  component={Loginpers}/>
       <Stack.Screen   name='Loginprof'  component={Login}/>
       <Stack.Screen   name='Signuppers'  component={Signuppers}/>
       <Stack.Screen   name='SignUpPro'  component={SignUpPro}/>
       
      

      </Stack.Navigator>
    </NavigationContainer>



  );
}


export default App;






