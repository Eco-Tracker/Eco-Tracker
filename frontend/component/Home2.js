import React, { useState } from 'react';
import {Button, StatusBar, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App({ navigation }) {
  const [imageSource, setImageSource] = useState(require('../images/1.png'));
  const [buttonPressCount, setButtonPressCount] = useState(0);

  // const handlePress = () => {
  //   if (buttonPressCount === 0) {
  //     // First button press
  //     setButtonPressCount(1); // Update button press count
  //   } else {
  //     navigation.navigate('Loginpers'); // Perform navigation to LoginComponent
  //   }
  // };

  // const handleImagePress = () => {
  //   navigation.navigate('Login'); // Perform navigation to LoginComponent
  // };
  const handleButton1=()=>{
    navigation.navigate('Loginpers')
  }
  const handleButton2=()=>{
    navigation.navigate('Loginprof')
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      {/* <Image source={imageSource} style={styles.image} onPress={handleImagePress} /> */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.Personalbutton} onPress={handleButton1}>
          <Text style={styles.buttonText}>PersonalUser</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.ProfesionalButton} onPress={handleButton2}>
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
