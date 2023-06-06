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
import Loginprof from './component/Loginprof.js';
import Signuppers from './component/Signuppers.js';
import Signupprof from './component/Signupprof.js';
import PersonnalUser from './component/PersonnalUser';




const Stack=createStackNavigator()


const App=() => { 



  return (

     <NavigationContainer  >
      <Stack.Navigator screenOptions={{headerShown:true}} initialRouteName='PersonnalUser' >
       <Stack.Screen   name='Home'  component={Home} />
       <Stack.Screen   name='Home2'  component={Home2}/>
       <Stack.Screen   name='Loginpers'  component={Loginpers}/>
       <Stack.Screen   name='Loginprof'  component={Loginprof}/>
       <Stack.Screen   name='Signuppers'  component={Signuppers}/>
       <Stack.Screen   name='Signupprof'  component={Signupprof}/>
       <Stack.Screen   name='PersonnalUser'  component={PersonnalUser} options={{
          title: '',
          headerStyle: {
            backgroundColor: '#F3F3F3',
            height: '12%',
          },
          headerLeft: () => (
            <Image source={headerLogo} style={{ width: 50, height: 50, marginLeft: 10 ,marginTop:"30%"}} />
          ),
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
      

      </Stack.Navigator>
    </NavigationContainer>



  );
}


export default App;







/*import React, { useRef, useEffect, useState } from 'react';
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
import LoginComponent from './components/login';

export default function App({navigation}) {
  const [fetchingData, setFetchingDataState] = useState(true);
  const [imageSource, setImageSource] = useState(require('./images/2.png'));
  const [buttonPressCount, setButtonPressCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFetchingDataState(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    if (buttonPressCount === 0) {
      // First button press
      Animated.timing(fadeAnim, {
        toValue: 1,
        alignItems: 'center',
        duration: 4000,
        useNativeDriver: true,
      }).start(() => {
        setButtonPressCount(1); // Update button press count
      });
    } else {
      // Second button press
      navigation.navigate('Login'); // Perform navigation to LoginComponent
    }
  };

  const handleImagePress = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const handleRestartAnimation = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      alignItems: 'center',
      duration: 4000,
      useNativeDriver: true,
    }).start();
  };

  if (fetchingData) {
    return <Loading />;
  } else {
    return (
      <View style={styles.container}>
        <Animated.View style={{ opacity: fadeAnim, marginBottom: 20 }}>
          <Text style={styles.text}>
            An "Eco Tracker" mobile application could feature a multitude of functions designed to support an
            eco-friendly lifestyle
          </Text>
        </Animated.View>

        <Animated.Image
          source={imageSource}
          style={[
            styles.image,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-200, 0],
                  }),
                },
              ],
            },
          ]}
          onPress={handleImagePress}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handlePress}
           onPress ={()=> navigation.navigate('login')}
          >
            <Text style={styles.buttonText}>{buttonPressCount === 0 ? 'Start' : 'Next'}</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </View>
    );
  }
}

const Loading = () => {
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
};



const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#4CAF50',
    width: 180,
    borderRadius: 12,
    alignItems: 'center',
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});
*/