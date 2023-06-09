import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import {auth} from "../Firebase/index";
import ADDRESS_IP from '../API'



const PostForm = () => {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [Title, setTitle] = useState('');
  const [buttonColor, setButtonColor] = useState('#000000');
  const [image, setImage] = useState('');
  const [id,setId]=useState('');
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

      const createPost = async () => {
        axios.get(`http://${ADDRESS_IP}:5000/users/email/${email}`)
  .then((res)=>{
    console.log(res.data[0].id)
    setId(res.data[0].id)
    console.log(id, 'amro')
    return res.data.id; // return the id to the next .then() block
  })
  .catch((err)=>{
    console.log(err)
  })

    console.log('this is id',id)

    try { 
      await axios.post(`http://${ADDRESS_IP}:5000/post/register`, {id: id,title:Title,body:description,image:image,type:type,like:4});
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Type"
        value={type}
        onChangeText={setType}
      />
       <TextInput
        style={styles.input}
        placeholder="Type"
        value={Title}
        onChangeText={setTitle}
      />
       <Button title="Select Image" onPress={selectImage} color={buttonColor} />

      {/* {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Choose Image" onPress={handleImageChange} /> */}
      <Button title="Submit" onPress={createPost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});

export default PostForm;
