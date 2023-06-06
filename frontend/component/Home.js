import React, { useRef, useEffect, useState } from 'react';
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
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App({ navigation }) {
  const [fetchingData, setFetchingDataState] = useState(true);
  const [imageSource, setImageSource] = useState(require('../images/Logo.png'));
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
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        setButtonPressCount(1); // Update button press count
      });
    } else {
      // Second button press
      navigation.navigate('Home2'); // Perform navigation to LoginComponent
    }
  };

  const handleImagePress = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleRestartAnimation = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  if (fetchingData) {
    return <Loading />;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

        <Animated.Image
          source={imageSource}
          style={[
            styles.image,
            {
              opacity: fadeAnim,
             
            },
          ]}
          onPress={handleImagePress}
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={handlePress}>
          <Text style={styles.buttonText}>{buttonPressCount === 0 ? 'Start' : 'Next'}</Text>
        </TouchableOpacity>

        <Animated.View style={{ opacity: fadeAnim, marginTop: 20 }}>
          <Text style={styles.text}>
            An "Eco Tracker" mobile application could feature a multitude of functions designed to support an
            eco-friendly lifestyle
          </Text>
        </Animated.View>

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
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 250,
  },
  text: {
    marginBottom: 20,
    textAlign: 'center',
  },
});
