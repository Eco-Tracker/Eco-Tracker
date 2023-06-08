import React, { useState, useEffect } from "react";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import { View, Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StatusBar, KeyboardAvoidingView, Platform, Image, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, googleAuthProvider } from "../Firebase/index";
import ADDRESS_IP from '../API'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignUpPro = ({ navigation }) => {
  const [professionalName, setProfessionalName] = useState('');
  const [professionalMail, setProfessionalMail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [codeFiscal, setCodeFiscal] = useState('');
  const [picture, setPicture] = useState('');
  const [buttonColor, setButtonColor] = useState('#000000');

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      uploadImageToCloudinary(result.assets[0].uri);
    }
  };

  const uploadImageToCloudinary = async (imageUri) => {
    const data = new FormData();
    let filename = imageUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    if (type === 'image/jpg') type = 'image/jpeg';
    if (type === 'image/png') type = 'image/png';

    data.append('file', { uri: imageUri, name: filename, type });
    data.append('upload_preset', 'lrkelxtq');

    try {
      let response = await axios.post(
        'https://api.cloudinary.com/v1_1/dtbzrpcbh/image/upload',
        data,
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      if (response.data.secure_url !== '') {
        const image = response.data.secure_url;
        setPicture(image);
      } else {
        Alert.alert("Error", "Image upload failed");
      }
    } catch (err) {
      Alert.alert("Error", "Image upload failed");
      console.log("Upload Image Error", err, err.request, err.response);
    }
  };

  const signUpUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        professionalMail,
        password
      );
      const user = userCredential.user;
      if (picture) {
        await updateProfile(user, {
          photoURL: picture
        });
        console.log('User profile updated');
      }

      await axios.post(`http://${ADDRESS_IP}:5000/proUsers/register`, {
        professionalName,
        professionalMail,
        password,
        contactNumber: parseInt(contactNumber, 10),
        codeFiscal,
        picture
      });

      console.log("User created:", user);
      navigation.navigate('Loginprof')
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handlePress = () => {
    if (
      professionalName.trim() !== '' &&
      password.trim() !== '' &&
      repeatPassword.trim() !== '' &&
      professionalMail.trim() !== ''
    ) {
      navigation.navigate('Loginprof'); // Navigate to the Login component/page
    }
  };

  const signUpWithGoogle = async () => {
    try {
      console.log("hello", auth, googleAuthProvider);
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
      Alert.alert("Error", error.message);
      console.log(error);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <KeyboardAwareScrollView  style={styles.ff}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <StatusBar style={styles.status} />
            <View style={styles.inner}>
              <TouchableOpacity style={styles.googleButton} onPress={signUpWithGoogle}>
                <Image source={require('../assets/SignupImage/Google.png')} style={styles.googleButtonImage} />
              </TouchableOpacity>

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
                value={professionalMail}
                onChangeText={setProfessionalMail}
              />
              <TextInput
                placeholder="Phone Number"
                style={styles.textInput}
                value={contactNumber}
                type="number"
                onChangeText={setContactNumber}
              />
              <TextInput
                placeholder="Code Fiscal"
                style={styles.textInput}
                value={codeFiscal}
                onChangeText={setCodeFiscal}
              />
              <Button title="Select Image" onPress={selectImage} color={buttonColor} />

              <TouchableOpacity style={[styles.btnContainer]}>
                <Text style={styles.buttonText} onPress={() => signUpUser()}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
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
  ff:{
top:70,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  googleButton: {
    flex: 1,
    position: 'absolute',
    bottom: -50,
    alignSelf: 'center',
  },
  googleButtonImage: {
    flex: 1,
    position: 'relative',
    top: -580,
    left: 5,
    width: 260,
    height: 55,
  },
  inner: {
    padding: 110,
    justifyContent: 'center', // Center buttons vertically
  },
  header: {
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  textInput: {
    top: 2,
    height: 30,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  btnContainer: {
    width: 280,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 15,
  },
  disabledBtnContainer: {
    opacity: 0.5,
  },
  status: {
    backgroundColor: 'red',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default SignUpPro;
