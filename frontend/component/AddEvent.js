import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ADDRESS_IP from '../API';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  Alert,
} from 'react-native';
import { auth } from '../Firebase/index';
import * as ImagePicker from 'expo-image-picker';
import logo from '../assets/littlelogo.png';

const AddEvent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [id, setId] = useState('');
  const [buttonColor, setButtonColor] = useState('#000000');
  const email = auth.currentUser.email;
  const navigation = useNavigation();

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

  const handlePost = () => {
    if (!name || !description || !date || !location || !image) {
      Alert.alert('Error', 'Please fill in all the necessary information to create this Post');
      return;
    }

    axios
      .get(`http://${ADDRESS_IP}:5000/proUsers/email/${email}`)
      .then((res) => {
        setId(res.data.id);
        return res.data.id;
      })
      .then((userId) => {
        return axios.post(`http://${ADDRESS_IP}:5000/event/add`, {
          id: id,
          name: name,
          description: description,
          image: image,
          location: location,
          like: 0,
          participants: 0,
          date: date,
        });
      })
      .then(() => {
        // Naviguer vers la page ProfHomePage après la mise à jour
        navigation.reset({
          index: 0,
          routes: [{ name: 'ProfHomePage' }],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.addEventText}>Add an Event</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Event name"
        value={name}
        onChangeText={(text) => setName(text)}
        underlineColorAndroid="transparent"
      />
      <TextInput
        style={[styles.input1]}
        placeholder="Description ..."
        value={description}
        onChangeText={(text) => setDescription(text)}
        underlineColorAndroid="transparent"
        multiline
        numberOfLines={15}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={(text) => setDate(text)}
        underlineColorAndroid="transparent"
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
        underlineColorAndroid="transparent"
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

      <TouchableOpacity onPress={handlePost} style={styles.button}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
    top: -10,
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  addEventText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: -15,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  input1: {
    width: 300,
    height: 90,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  third: {
    top: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 5,
    top: -10,
  },
  image: {
    width: 150,
    height: 150,
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 70,
    borderRadius: 10,
    marginBottom: 50,
    top: 50,
    left: 50,
    backgroundColor: '#9AC341',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AddEvent;
