import React, { useState } from 'react';
import { StatusBar, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App({ navigation }) {
  const [imageSource, setImageSource] = useState(require('../images/1.png'));
  const [buttonPressCount, setButtonPressCount] = useState(0);

  const handlePress = () => {
    if (buttonPressCount === 0) {
      // First button press
      setButtonPressCount(1); // Update button press count
    } else {
      // Second button press
      navigation.navigate('Loginpers'); // Perform navigation to LoginComponent
    }
  };

  const handleImagePress = () => {
    navigation.navigate('Loginprof'); // Perform navigation to LoginComponent
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      <Image source={imageSource} style={styles.image} onPress={handleImagePress} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.Personalbutton} onPress={handlePress}>
          <Text style={styles.buttonText}>PersonalUser</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.ProfesionalButton} onPress={handlePress}>
        <Text style={styles.buttonText}>ProfesionalUser</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  Personalbutton: {
    backgroundColor: '#4CAF50',
    width: 240,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProfesionalButton: {
    backgroundColor: '#4CAF50',
    width: 240,
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
    width: 300,
    height: 330,
    marginTop: 20,
  },
});
