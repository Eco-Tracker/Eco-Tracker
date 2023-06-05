import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Signup = ({ navigation }) => {
  const [professionalName, setProfessionalName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignup = () => {
    // Perform Signup logic here
  };

  const handlePress = () => {
    if (
      professionalName.trim() !== '' &&
      password.trim() !== '' &&
      repeatPassword.trim() !== '' &&
      email.trim() !== '' &&
      phoneNumber.trim() !== ''
    ) {
      navigation.navigate('Loginpers'); // Navigate to the Login component/page
    }
  };

  const handleGoogleSignup = () => {
    // Perform Google Signup logic here
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <StatusBar style={styles.status} />
          <View style={styles.inner}>
            <Text style={styles.header}>Personal Signup</Text>
            <TextInput
              placeholder="Professional Name"
              style={styles.textInput}
              value={professionalName}
              onChangeText={setProfessionalName}
            />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              placeholder="Repeat Password"
              style={styles.textInput}
              secureTextEntry={true}
              value={repeatPassword}
              onChangeText={setRepeatPassword}
            />
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Phone Number"
              style={styles.textInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <TouchableOpacity
              style={[styles.btnContainer, !handlePress ? styles.disabledBtnContainer : null]}
              onPress={handlePress}
              disabled={!handlePress}
            >
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignup}>
              <AntDesign name="google" size={24} color="white" />
              <Text style={styles.googleButtonText}>Sign Up with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inner: {
    padding: 30,
    flex: 1,
    justifyContent: 'center', // Center buttons vertically
  },
  header: {
    fontSize: 36,
    marginBottom: 8,
    textAlign: 'center',
  },
  textInput: {
    height: 30,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  btnContainer: {
    width: 180,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    paddingVertical: 10,
  },
  disabledBtnContainer: {
    opacity: 0.5,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DB4437',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 10,
  },
  googleButtonText: {
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    backgroundColor: 'red',
  },
});

export default Signup;
