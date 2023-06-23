import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, Image, StatusBar, StyleSheet, TouchableOpacity, Button, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth } from "../Firebase/index";
import ADDRESS_IP from '../API';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from "../assets/littlelogo.png";

function UpdatePers({ route }) {
  let navigation = useNavigation();
  const user = route.params.user;
  const id = user.id;
  console.log(id, 'this is user');

  const [name, setname] = useState(user.name);
  const [mail, setmail] = useState(user.mail);
  const [password, setPassword] = useState(user.password);
  const [phone, setphone] = useState(user.phone.toString());
  const [photo, setphoto] = useState(user.photo);
  const [buttonColor, setButtonColor] = useState('#4CAF50');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setname(user.name);
    setmail(user.mail);
    setPassword(user.password);
    setphone(user.phone.toString());
    setphoto(user.photo);
  }, [user]);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
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

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style={styles.container} />
      <TouchableOpacity onPress={goBack} style={styles.appButtonContainer}>
        <Icon name="arrow-back" size={34} color="green" />
      </TouchableOpacity>
      <Image source={logo} style={styles.logo} />

      <View style={styles.imageContainer}>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        )}
        <TouchableOpacity onPress={selectImage} style={{ height: 100, width: 100, borderColor: "gray", borderWidth: 3, borderStyle: "dashed", borderRadius: 10, justifyContent: "center" }} >
          <Text style={{ textAlign: "center" }}>Select Image</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.textInput}
        onChangeText={setname}
        value={name}
        placeholder=" Name"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setmail}
        value={mail}
        placeholder=" Mail"
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

      <TouchableOpacity onPress={updateProfile} style={styles.appButtonContainer1}>
        <Text style={styles.appButtonText}>Submit</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    top: -40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  selectedImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
  textInput: {
    width: '90%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 13,
    backgroundColor: 'white',
  },
  appButtonContainer: {
    borderRadius: 6,
    alignItems: 'center',
    margin: 10,
    padding: 5,
    left: -130,
    top: 85,
  },
  appButtonContainer1: {
    top: 10,
    width: '70%',
    elevation: 8,
    backgroundColor: '#9AC341',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  appButtonText2: {
    top: 50,
    color: 'grey',
    fontSize: 14,
    fontWeight: 'bold',
    right: -110,
  },
  appButtonContainer2: {
    borderRadius: 6,
    alignItems: 'center',
    margin: 10,
    padding: 5,
    top: -20,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  logo: {
    height: 70,
    width: 70,
    top: 20,
    right: -120,
  },
});

export default UpdatePers;
