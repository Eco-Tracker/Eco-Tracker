import React, { useState } from 'react';
import {
  Alert,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { signInWithEmailAndPassword} from "firebase/auth";
import {auth, googleAuthProvider } from "../Firebase/index";
const LoginUser = ({ navigation }) => {
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
        const userCredential = await signInWithEmailAndPassword (
          auth,
          mail,
          password
        );
        const user = userCredential.user;
        Alert.alert("Welcome");
        console.log("User created:", user);
      } catch (error) {
        Alert.alert("Signup first", error.message);
      }
    };

  const handlePress = () => {
    // Add handle press logic here
  };

  const handleSignUp = () => {
    navigation.navigate('Signuppers'); // Navigate to the SignUp component/page
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
            <Text style={styles.header} onPress={handleLogin}>Login</Text>
            <TextInput placeholder="Email" value={mail} onChangeText={(text) => setEmail(text)} style={styles.textInput} />
            <TextInput placeholder="Password" onChangeText={(text) => setPassword(text)} style={styles.textInput} secureTextEntry={true} value={password} />
            <TouchableOpacity style={styles.btnContainer} onPress={handleLogin}>
                  <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                <Text style={[styles.signUpText, { color: '#4CAF50' }]}>Sign Up</Text>
              </TouchableOpacity>
            </View>
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
    padding: 40,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 8,
    textAlign: 'center',
  },
  textInput: {
    height: 40,
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
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  signUpButton: {
    marginLeft: 5,
  },
  signUpText: {
    
    fontSize: 12,
    lineHeight: 14,
  },
  status: {
    backgroundColor: 'red',
  },
});

export default LoginUser;