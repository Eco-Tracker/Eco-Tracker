import React, { useState } from 'react';
import { Button, StatusBar, Image, StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native';

export const ToggleButton = ({ userType, onToggle, onButtonPress }) => {
  const [isEnabled, setIsEnabled] = useState(userType === 'personal');

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    onToggle();
  };

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        {isEnabled ? (
          <Text style={styles.textOn} onPress={toggleSwitch}>Personal User</Text>
        ) : (
          <Text style={styles.textOff} onPress={toggleSwitch}>Professional User</Text>
        )}
        <Switch
          trackColor={{ false: '#3E3E3E', true: '#4CAF50' }}
          thumbColor={isEnabled ? '#fff' : '#fff'}
          ios_backgroundColor="#3E3E3E"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ transform: [{ scaleX: 1.5 }] }} // Adjust the scaleX value for desired width
        />
      </View>
    </View>
  );
};

export default function App({ navigation }) {
  const [userType, setUserType] = useState('personal');

  const handleToggle = () => {
    setUserType(prevType => prevType === 'personal' ? 'professional' : 'personal');
  };

  const handleImagePress = () => {
    navigation.navigate('Login');
  };

  const handleButton = () => {
    if (userType === 'personal') {
      navigation.navigate('Loginpers');
    } else {
      navigation.navigate('Loginprof');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      {userType === 'personal' ? (
        <Image source={require('../images/1.png')} style={styles.image} onPress={handleImagePress} />
      ) : (
        <Image source={require('../images/2.png')} style={styles.image1} onPress={handleImagePress} />
      )}

      <View style={styles.buttonContainer}>
        <ToggleButton userType={userType} onToggle={handleToggle} onButtonPress={handleButton} />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Here you have to make your choice if you are a visitor member or a professional type</Text>

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
  toggleContainer: {
    alignItems: 'center',
  },
  loginButton: {
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
    marginTop: 10,
    top: -70,
  },
  image1: {
    width: 300,
    height: 330,
    marginTop: 10,
    top: -20,
  },
  textOn: {
    fontSize: 26,
    color: 'green',
    marginBottom: 0,
  },
  textOff: {
    fontSize: 26,
    color: 'green',
    marginBottom: 10,
  },
  footerText: {
    marginTop: 20,
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
  },
});
