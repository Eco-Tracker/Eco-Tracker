import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, DefaultTheme } from "@react-navigation/stack";


import Wrapper from "./component/Wrapper";


import Home from './component/Home'
import Home2 from './component/Home2'
import Loginpers from './component/Loginpers.js';
import Login from './component/Loginprof.js';
import Signuppers from './component/Signuppers.js';
import Signupprof from './component/Signupprof.js';
import PersonnalUser from './component/PersonnalUser';
import ProfesionnalUser from './component/ProfesionnalUser';
import PostList from './component/HomePage';
import post from './component/post'
import Nav from "../frontend/NavBar/Nav"
import ProfHomePage from './component/ProfHomePage';





const Stack=createStackNavigator()


const App=() => { 



  return (
    

    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="carousel"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Home2" component={Home2} />
        <Stack.Screen name="Loginpers" component={Loginpers} />
        <Stack.Screen name="Loginprof" component={Login} />
        <Stack.Screen name="Signuppers" component={Signuppers} />
        <Stack.Screen   name='Signupprof'  component={Signupprof}/>
       <Stack.Screen   name='ProfHomePage'  component={ProfHomePage}/>
        <Stack.Screen name="PersonnalUser" component={PersonnalUser} />
        <Stack.Screen name="ProfesionnalUser" component={ProfesionnalUser} />
        <Stack.Screen name="carousel" component={Wrapper} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;






