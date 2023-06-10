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
import eventDetails from "./component/constants/EventDetails";
import post from './component/post'
import NavBar from "./component/NavBarPro";
import ProfHomePage from './component/ProfHomePage';
import AddEvent from "./component/AddEvent"
import TopPlacesCarousel from './component/constants/TopPlacesCarousel';




const Stack=createStackNavigator()


const App=() => { 



  return (
    

    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Home2" component={Home2} />
        <Stack.Screen name="Loginpers" component={Loginpers} />
        <Stack.Screen name="Loginprof" component={Login} />
        <Stack.Screen name="Signuppers" component={Signuppers} />
        <Stack.Screen   name='Signupprof'  component={Signupprof}/>
        <Stack.Screen   name='eventDetails'  component={eventDetails}/>
        <Stack.Screen   name='ProfHomePage'  component={NavBar}/>
        <Stack.Screen name="PersonnalUser" component={PersonnalUser} />
        <Stack.Screen name="ProfesionnalUser" component={ProfesionnalUser} />
        <Stack.Screen name="TopPlacesCarousel" component={TopPlacesCarousel} />
        <Stack.Screen name="Wrapper" component={Wrapper} />
        <Stack.Screen name="post" component={post} />
        <Stack.Screen name="AddEvent" component={AddEvent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;






