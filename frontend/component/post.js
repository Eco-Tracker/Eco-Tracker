import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Text, ScrollView } from 'react-native';
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import { auth } from "../Firebase/index";
import ADDRESS_IP from '../API';

const PostForm = () => {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [buttonColor, setButtonColor] = useState('#000000');
  const [image, setImage] = useState('');
  const [id, setId] = useState('');
  const email = auth.currentUser.email;

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      uploadImageToCloudinary(result.assets[0].uri);
    }
  };

  const uploadImageToCloudinary = async (imageUri) => {
    const data = new FormData();
    let filename = imageUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : 'image';

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
            accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.data.secure_url !== '') {
        const image = response.data.secure_url;
        setImage(image);
      } else {
        Alert.alert('Error', 'Image upload failed');
      }
    } catch (err) {
      Alert.alert('Error', 'Image upload failed');
      console.log('Upload Image Error', err, err.request, err.response);
    }
  };

  const createPost = async () => {
    try {
      const res = await axios.get(`http://${ADDRESS_IP}:5000/users/email/${email}`);
      const userId = res.data[0].id;
      setId(userId);

      await axios.post(`http://${ADDRESS_IP}:5000/post/register`, {
        id: userId,
        title: title,
        body: description,
        image: image,
        type: type,
        like: 4,
      });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/PersHome/Smalllogo.png')} style={styles.logo} />
      <Text style={styles.title}>Create Post</Text>
      <ScrollView style={styles.scrollView}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input1}
          placeholder="Description..."
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={4}
        />
        <TextInput
          style={styles.input2}
          placeholder="Type"
          value={type}
          onChangeText={setType}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={selectImage}>
            <Text style={styles.selectImageText}>Select Image</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={createPost}
          disabled={!title || !description || !type || !image}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center', // Ajout de la propriété justifyContent pour centrer les éléments verticalement
  },
  scrollView: {
    flex: 1,
    width: '100%',
    margin: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  logo: {
    width: 105,
    height: 120,
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    top: 20,
  },
  input1: {
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    height: 120,
    textAlignVertical: 'top',
    top: 20,
  },
  input2: {
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    top: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 22,
    alignItems: 'center', // Centrer les éléments horizontalement
  },
  selectImageText: {
    fontSize: 16,
    color: 'black',
  },
  submitButton: {
    marginTop: 15,
    backgroundColor: '#4CAF50',
    width: 240,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    left:35,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default PostForm;
