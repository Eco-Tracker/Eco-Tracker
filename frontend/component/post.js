import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const PostForm = () => {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [Title, setTitle] = useState('');

  const [image, setImage] = useState(null);

 

  const handleImageChange = () => {
    // Implement your logic to choose an image here
    // You can use libraries like react-native-image-picker or react-native-camera
  };
  
//   const handleSubmit = () => {
//     // Implement your logic to submit the post
//     // You can send the data to an API endpoint or handle it locally
//     console.log('Post submitted:', { description, type, image });
//   };


  const createPost = async () => {
    try {
      await axios.post('http://192.168.1.3:5000/post/register', {title:Title,body:description,image:image,type:type,like:4});
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
        <TextInput
        style={styles.input}
        placeholder="Type"
        value={Image}
        onChangeText={setImage}
      />
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
