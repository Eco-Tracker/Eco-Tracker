import React, { useState } from 'react'
import { View, Text,TextInput,Alert, Image, StyleSheet,TouchableOpacity,Button} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth } from "../Firebase/index";
import ADDRESS_IP from '../API'
import axios from 'axios'
import {useNavigation} from '@react-navigation/native'
function UpdateProfile({route}) {
    let navigation=useNavigation();
    const user=route.params.user
    const id=user.id
    console.log(id,'this is user')
    const [professionalName, setProfessionalName] = useState("");
    const [professionalMail, setProfessionalMail] = useState("");
    const [password, setPassword] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [codeFiscal, setCodeFiscal] = useState("");
    const[picture, setPicture]=useState("");
    const [buttonColor, setButtonColor] = useState('#4CAF50');

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
    const updateProfile = async () => {
        try {

    
          await axios.put(`http://${ADDRESS_IP}:5000/proUsers/${id}`, {
            picture: picture,
            professionalName: professionalName,
            professionalMail: professionalMail,
            password: password,
            contactNumber: parseInt(contactNumber, 10),
            codeFiscal: codeFiscal
          })
          .then((response) => {
            console.log(response, 'response');
            alert("Updated successfully");
          })
          .catch((error) => {
            console.log(error.message);
          });
    
          navigation.navigate("profile");
        } catch (error) {
          console.log(error.message);
        }
      };
    
      return (
        <View>
          <Button title="Select Image" onPress={selectImage} color={buttonColor} />
          {/* Add input fields for the necessary profile information */}
          <TextInput
            style={styles.textInput}
            onChangeText={setProfessionalName}
            value={professionalName}
            placeholder="Professional Name"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={setProfessionalMail}
            value={professionalMail}
            placeholder="Professional Mail"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry
          />
          <TextInput
            style={styles.textInput}
            onChangeText={setContactNumber}
            value={contactNumber}
            placeholder="Contact Number"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={setCodeFiscal}
            value={codeFiscal}
            placeholder="Code Fiscal"
          />
    
          <TouchableOpacity
            onPress={updateProfile}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Submit</Text>
          </TouchableOpacity>
    
          <TouchableOpacity
            onPress={() => {
              auth.signOut();
            }}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      );
    }
const styles = StyleSheet.create({
  
  signin: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  head:{
    flexDirection: 'row',
    height:50,
    marginVertical:40
  },
textInput:{
    width: '70%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius :13,
},
appButtonContainer: {
    width:'70%',
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
})
  
export default UpdateProfile; 