import React, { useState } from 'react'
import { View, Text,TextInput,Alert, Image, StyleSheet,TouchableOpacity,Button} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth } from "../Firebase/index";
import ADDRESS_IP from '../API'
import axios from 'axios'
import {useNavigation} from '@react-navigation/native'
function UpdatePers({route}) {
    let navigation=useNavigation();
    const user=route.params.user
    const id=user.id
    console.log(id,'this is user')
    const [name, setname] = useState("");
    const [mail, setmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setphone] = useState("");
    const[photo, setphoto]=useState("");
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
          setphoto(image);
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

    
          await axios.put(`http://${ADDRESS_IP}:5000/users/${id}`, {
            photo: photo,
            name: name,
            mail: mail,
            password: password,
            phone: parseInt(phone, 10),
          })
          .then((response) => {
            console.log(response, 'response');
            alert("Updated successfully");
          })
          .catch((error) => {
            console.log(error.message);
          });
    
          navigation.navigate("PersonnalUser");
        } catch (error) {
          console.log(error.message);
        }
      };
    
      return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                onChangeText={setname}
                value={name}
                placeholder="Professional Name"
            />
            <TextInput
                style={styles.textInput}
                onChangeText={setmail}
                value={mail}
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
                onChangeText={setphone}
                value={phone}
                placeholder="Contact Number"
                keyboardType="numeric"
            />
            <Button style={styles.button} title="Select Image" onPress={selectImage} color={buttonColor} />
            <TouchableOpacity
                onPress={updateProfile}
                style={styles.appButtonContainer}
            >
                <Text style={styles.appButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        alignItems: 'center'
    },
    textInput:{
        width: '100%',
        height: 50,
        borderColor: '#aaa',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 20,
        borderRadius :13,
        backgroundColor: '#fff'
    },
    button: {
        marginBottom: 20,
        width: '100%',
        borderRadius: 5,
        color: '#fff'
    },
    appButtonContainer: {
        width:'100%',
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
  
export default UpdatePers; 