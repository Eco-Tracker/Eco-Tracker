import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, StatusBar, Image, StyleSheet,Text,TouchableOpacity  } from 'react-native';
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import {auth} from "../Firebase/index";
import ADDRESS_IP from '../API'
import logo from "../assets/littlelogo.png"

import { useNavigation } from '@react-navigation/native';



const PostForm = () => {
  const [body, setDescription] = useState('');
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [buttonColor, setButtonColor] = useState('#000000');
  const [image, setImage] = useState('');
  const [id,setId]=useState('');
  const email = auth.currentUser.email
  const navigation = useNavigation();

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
// const handleGet = () =>{
//   axios.get(`http://${ADDRESS_IP}:5000/users/email/${email}`)
//   .then((res)=>{
//     console.log( res.data)
//     setId(res.data[0].id)
//     console.log(id, 'amro')
//     // return res.data.id; // return the id to the next .then() block
//   })
//   .catch((err)=>{
//     console.log(err)
//   })
// }

  const createPost = () => {
    if (!title || !body  || !image) {
      Alert.alert('Error', 'Please fill in all the necessary information to create this Post');
      return;
    }
    axios.get(`http://${ADDRESS_IP}:5000/users/email/${email}`)
      .then((res) => {
        console.log(res.data[0].id, "hello")
        setId(res.data[0].id)
        console.log(id, 'amro')
        return res.data.id; 
      })
      .then((userId) => {
        return axios.post(`http://${ADDRESS_IP}:5000/post/register`, {
          id: id,
          title: title,
          body: body,
          image: image,
          type: type,
          like: 0
        })
      })
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Wrapper' }],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
      


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />

    <View style={styles.Ucontainer}>
      <View style={styles.first}>
        <Image source={logo} style={styles.image2} />
        <Text style={styles.addPosttext}>Create Post</Text>
        </View>
        
      <View style={styles.second}>
        <Text style={{fontSize:15,fontWeight:"bold"}}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Add title"
            value={title}
            onChangeText={setTitle}
        underlineColorAndroid="transparent"
          />
          
      <Text style={{fontSize:15,fontWeight:"bold"}}>Type</Text>
      <TextInput
        style={styles.input}
        placeholder="Add type of the post"
        value={type}
        onChangeText={setType}
          />
          
      <Text style={{fontSize:15,fontWeight:"bold"}}>Description</Text>
       <TextInput
        style={styles.input2}
        placeholder="Description ..." 
        value={body}
        onChangeText={setDescription}
        underlineColorAndroid="transparent"
        multiline
        numberOfLines={15}
      />
      
          <View style={styles.third}>
            <TouchableOpacity
              onPress={selectImage}
              style={{
                height: 100,
                width: 100,
                borderColor: 'gray',
                borderWidth: 3,
                borderStyle: 'dashed',
                borderRadius: 10,
                justifyContent: 'center',
                right: -10,
              }}
            >
              <Text style={{ textAlign: 'center' }}>Select Image</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={selectImage} style={styles.imageContainer}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <Image source={logo} style={styles.logo} />
              )}
            </TouchableOpacity>
          </View>

      {/* {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Choose Image" onPress={handleImageChange} /> */}
      <TouchableOpacity onPress={createPost} style={styles.button} >
            <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Ucontainer: {
    flex: 1,
    padding: 20,
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  button: {
    width: 170,
    height: 45,
    backgroundColor: 'green',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    right: -120,
    top:10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  addPosttext: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: -15,
  },
  input: {
    backgroundColor: 'white',
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 20,
    borderRadius: 10,
    paddingLeft: 10,
  },
  input2: {
    backgroundColor: 'white',
    width: 300,
    height: 100,
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 20,
    borderRadius: 10,
    paddingLeft: 10,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  
  image2 : {
    width: 55,
    height: 55,

  },
  first:{
   alignItems: 'center',
   top:30
  },
  second : {
    top:60
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  imageContainer: {
    height: 100,
    width: 100,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    right: -70,
  },
  image: {
    height: 120,
    width: 150,
    borderRadius: 10,
  },
  third: {
    flexDirection: 'row',
  },
});

export default PostForm;