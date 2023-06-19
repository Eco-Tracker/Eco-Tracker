import React, { useState, useEffect } from 'react';
import axios from "axios";
import ADDRESS_IP from '../API';
import { View, Button, Image, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Text, Alert } from 'react-native';
import { auth } from "../Firebase/index";
import * as ImagePicker from 'expo-image-picker';
import logo from "../assets/littlelogo.png";
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const UpdateEvent = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;
  const idEV = item.idEV;
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [date, setDate] = useState(item.date);
  const [image, setImage] = useState('');
  const [like, setLike] = useState('');
  const [location, setLocation] = useState(item.location);
  const [participants, setParticipants] = useState('');
  const [id, setId] = useState('');
  const [buttonColor, setButtonColor] = useState('#000000');
  const [updateInProgress, setUpdateInProgress] = useState(false); // Variable d'état pour suivre l'état de l'actualisation
  const email = auth.currentUser.email;

  useEffect(() => {
    // ...

    return () => {
      // ...
    };
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
    if (updateInProgress) {
      return; // Empêcher l'actualisation si une actualisation est déjà en cours
    }

    setUpdateInProgress(true); // Marquer l'actualisation comme en cours

    axios.get(`http://${ADDRESS_IP}:5000/proUsers/email/${email}`)
      .then((res) => {
        console.log(res.data.id, 'this is the id')
        setId(res.data.id)
        console.log(id, 'amro')
        return res.data.id;
      })
      .then((userId) => {
        console.log(userId, '2 id ---')
        return axios.put(`http://${ADDRESS_IP}:5000/event/${idEV}`, {
          authorId: userId,
          name: name,
          description: description,
          image: image,
          location: location,
          like: item.like,
          participants: item.participants,
          date: date.slice(0, 10) // Limiter la date à 10 caractères (position 1 à 10)
        })
      })
      .then(() => {
        // Naviguer vers la page ProfHomePage après la mise à jour
        navigation.reset({
          index: 0,
          routes: [{ name: 'ProfHomePage' }],
        });
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setUpdateInProgress(false); // Réinitialiser l'état de l'actualisation une fois terminée
      });
  }

  

  return (
    <ScrollView contentContainerStyle={styles.container}>

     

      <View style={styles.first}>
        <Image source={logo} style={styles.image2} />
        <Text style={styles.title}>Add Your Event</Text>
      </View>
      <View style={styles.second}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input1}
          placeholder="Description ..."
          value={description}
          onChangeText={(text) => setDescription(text)}
          underlineColorAndroid="transparent"
          multiline
          numberOfLines={15}

        />
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="date"
          value={date.slice(0, 10)} // Limiter la valeur à 10 caractères
          onChangeText={setDate}
        />
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
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

        <TouchableOpacity onPress={handleUpdate} style={styles.button} >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: -20,
    flexGrow: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  first: {
    alignItems: 'center',
    marginTop: -15,
  },
  image2: {
    top: 40,
    width: 55,
    height: 55,
  },
  title: {
    top: 30,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  second: {
    marginTop: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
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
  button: {
    width: 150,
    height: 50,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 20,
    top: 30,
    left: 160,
    backgroundColor: '#9AC341',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  third: {
    top: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 5,
    top: 10,
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
  appButtonContainer: {
    borderRadius: 6,
    alignItems: 'center',
    margin: 10,
    padding: 5,
    left: -130,
    top: 85,
  },
});

export default UpdateEvent;
