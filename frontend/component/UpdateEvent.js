import React, { useState, useEffect  } from 'react';
import axios from "axios"
import ADDRESS_IP from '../API'
import { View,Button, Image, TouchableOpacity, StyleSheet, TextInput, StatusBar, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import {auth} from "../Firebase/index";
import * as ImagePicker from 'expo-image-picker';
import logo from "../assets/littlelogo.png";
import { useNavigation, useRoute } from '@react-navigation/native';   
const UpdateEvent = () => {
    const route = useRoute();
    const { item } = route.params;
    const idEV = item.idEV;
    console.log(idEV, 'this is the id of the event')
  const [name,setName]=useState(item.name);
  const [description,setDescription]=useState(item.description);
  const [date,setDate]=useState(item.date);
  const [image,setImage]=useState('');
  const [like,setLike]=useState('');
  const [location,setLocation]=useState(item.location);
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

const handleUpdate = () => {
  axios.get(`http://${ADDRESS_IP}:5000/proUsers/email/${email}`)
  .then((res) => {
    console.log(res.data.id, 'this is the id')
    setId(res.data.id)
    console.log(id, 'amro')
    return res.data.id; 
  })
  .then((userId) => { 
    console.log(userId,'2 id ---')
    return axios.put(`http://${ADDRESS_IP}:5000/event/${idEV}`,{
      authorId: userId,
      name: name,
      description: description,
      image: image,
      location: location,
      like: item.like,
      participants: item.participants,
      date: date
    })
  })
  .catch((err) => {
    console.log(err)
  })
}
  


  return (
    <View style={styles.container}>
      <View style={styles.first}>
        <Image source={logo} style={styles.image2} />
        <Text style={{fontSize:20,fontWeight:"bold"}}>Add Your Event</Text>
      </View>
      <View style={styles.second}>
      <Text style={{fontSize:20,fontWeight:"bold"}}>Title</Text>
        <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <Text style={{fontSize:20,fontWeight:"bold"}}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Text style={{fontSize:20,fontWeight:"bold"}}>Date</Text>
      <TextInput
        style={styles.input}
        placeholder="date"
        value={date}
        onChangeText={setDate}
      />
      <Text style={{fontSize:20,fontWeight:"bold"}}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
       <Button title="Select Image"  onPress={selectImage} color={buttonColor} />

      <TouchableOpacity onPress={handleUpdate} style={styles.button} >
        <Text style={{color:"white",fontSize:30,padding:2,textAlign:"center"}}>Update</Text>
        </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button : {
    backgroundColor: "#4CAF50",
    width:310,
    borderRadius: 10,
    height:45,
    top:50
   
  },
  input: {
    marginBottom: 10,
    marginTop: 2,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    fontSize:17
  },
  input2: {
    
    marginBottom: 10,
    marginTop: 2,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    fontSize:17,
    width:"100%",
    height:200,
     
    
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  image2 : {
    width: 55,
    height: 55,

  },
  first:{
   alignItems: 'center',
   top:20
  },
  second : {
    top:70
  },
  third : {
    top : 120,
    flexDirection:"row",
   justifyContent: 'center',
   gap:50
  }
});

export default UpdateEvent;

