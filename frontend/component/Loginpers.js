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
  professionalMail,
} from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, googleAuthProvider } from "../Firebase/index";

const LoginUser = ({ navigation }) => {
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dataa, setDataa] = useState("");
  const [id, setId] = useState("")

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        mail,
        password
      );
      const user = userCredential.user;
      Alert.alert("Welcome");
      console.log("User created:", user);
      navigation.navigate("Wrapper");
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

  const resetPassword = () => {
    sendPasswordResetEmail(auth, mail)
      .then((res) => {
        console.log(mail, "email")
        alert('password reset email has been sent successfully')
      })
      .catch((error) => {
        alert('Please enter a valid email', error);
      });
  }

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
            <Text style={styles.header} onPress={handleLogin}>Please add the necessary informations to access the application</Text>
            <TextInput placeholder="Email" value={mail} onChangeText={(text) => setEmail(text)} style={styles.textInput} />
            <TextInput placeholder="Password" onChangeText={(text) => setPassword(text)} style={styles.textInput} secureTextEntry={true} value={password} />

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>

              <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                <Text style={[styles.signUpText, { color: '#4CAF50', fontWeight: 'bold', fontSize: 13 }]}>Sign Up</Text>
              </TouchableOpacity>
              <Text style={styles.forgotPasswordText} onPress={() => { resetPassword() }}>Forgot password ?</Text>
            </View>
            <TouchableOpacity style={styles.btnContainer} onPress={handleLogin}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
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
    justifyContent: 'space-around',
  },
  header: {
    top: 50,
    fontSize: 14,
    marginBottom: -20,
  },
  textInput: {
    height: 50,
    borderColor: '#4CAF50',
    borderBottomWidth: 1,
    marginBottom: -60,
  },
  btnContainer: {
    top: 25,
    width: 320,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    paddingVertical: 10,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    top: 80,
  },
  signUpButton: {
    marginLeft: 5,
  },
  signUpText: {
    fontSize: 10,
    lineHeight: 14,
    top: -90,
    left: -35,
  },
  forgotPasswordText: {
    fontSize: 8,
    lineHeight: 14,
    fontWeight: 'bold',
    top: -90,
    left: 35,
  },

});

export default LoginUser;