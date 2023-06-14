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
import Nav from "../frontend/NavBar/Nav"
import ProfHomePage from './component/ProfHomePage';
import AddEvent from "./component/AddEvent"
import PostForm from "./component/post"
import UpdateProfile from "./component/UpdateProfile"
import PostList from './component/HomePage';
import EventDetails from "./component/constants/EventDetails";
import post from './component/post'
import NavBar from "./component/NavBarPro";
import TopPlacesCarousel from './component/constants/TopPlacesCarousel';
import NavBarPers from './component/NavBarPers'
import Chat from "./component/Chat";
import UpdatePers from "./component/UpdatePers";




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
        <Stack.Screen   name='EventDetails'  component={EventDetails}/>
        <Stack.Screen   name='ProfHomePage'  component={NavBar}/>
        <Stack.Screen name="PersonnalUser" component={PersonnalUser} />
        <Stack.Screen name="ProfesionnalUser" component={ProfesionnalUser} />
        <Stack.Screen name="TopPlacesCarousel" component={TopPlacesCarousel} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="UpdatePers" component={UpdatePers} />
        <Stack.Screen name="Wrapper" component={NavBarPers} />
        <Stack.Screen name="post" component={PostForm} />
        <Stack.Screen name="AddEvent" component={AddEvent} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;