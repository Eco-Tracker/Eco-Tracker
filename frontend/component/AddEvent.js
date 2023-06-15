import React, { useState, useEffect  } from 'react';
import axios from "axios"
import ADDRESS_IP from '../API'
import { View,Button, Image, TouchableOpacity, StyleSheet, TextInput, StatusBar, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import {auth} from "../Firebase/index";
import * as ImagePicker from 'expo-image-picker';
const AddEvent = () => {
  const [name,setName]=useState('');
  const [description,setDescription]=useState('');
  const [date,setDate]=useState('');
  const [image,setImage]=useState('');
  const [like,setLike]=useState('');
  const [location,setLocation]=useState('');
  const [participants,setParticipants]=useState('');
  const [id,setId]=useState('');
  const [buttonColor, setButtonColor] = useState('#000000');
  const email = auth.currentUser.email

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
    setImage(image); 
  } else {
    Alert.alert("Error", "Image upload failed");
  }
} catch (err) {
  Alert.alert("Error", "Image upload failed");
  console.log("Upload Image Error", err, err.request, err.response);
}
}

  const handlePost = () =>{
    axios.get(`http://${ADDRESS_IP}:5000/proUsers/email/${email}`)
    .then((res)=>{
      console.log(res.data.id, 'this is the id')
      setId(res.data.id)
      console.log(id, 'amro')
      return res.data.id; 
    })
    .then((userId)=>{ 
      console.log(userId,'2 id ---')
      return axios.post(`http://${ADDRESS_IP}:5000/event/add`,{
        id: id,
        name:name,
        description:description,
        image:image,
        location:location,
        like:0,
        participants:0,
        date:date
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  


  return (
    <View style={styles.container}>
        <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="date"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
       <Button title="Select Image" onPress={selectImage} color={buttonColor} />
      <Button title="Submit" onPress={handlePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input:{
    width: '70%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius :13,
},
  scrollView: {
    flex: 1,
    top: -13,
  },
  content: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    
  },
  imageStyle: {
    width: 100, 
    height: 100, 
  },
  searchInput: {
    position: 'absolute',
    width: 280,
    height: 40,
    backgroundColor: '#FBFDFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    top: 15,
    left: 75,
    borderColor: '#E6E6E6',
  },
  logo: {
    position: 'absolute',
    top: 10,
    left: 30,
    width: 40,
    height: 43,
  },
  button: {
    marginBottom: 60,
  },
  profilButton: {
    position: 'absolute',
    width: 40,
    height: 50,
    top: 330,
    left: 150,
    alignItems: 'center',
    paddingBottom: 0,
  },
  formNavBarButton: {
    position: 'absolute',
    width: 425,
    height: 155,
    top: 605,
    left: -33,
    alignItems: 'center',
    paddingBottom: 0,
  },
  homeButton: {
    position: 'absolute',
    top: 330,
    left: 15,
    width: 47,
    height: 50,
  },
  addButton: {
    position: 'absolute',
    top: 305,
    bottom: 60,
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  
  shape: {
    position: 'absolute',
    top: 60,
    width: 360,
    height: 711,
    backgroundColor: '#F9F9F9',
    borderRadius: 20,
  },
  textStyle: {
    fontSize: 30,
    padding: 80,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    color: 'black',
    borderRadius: 20,
    width: 330,
    
  },

});

export default AddEvent;

