import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ADDRESS_IP from '../API';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
  Platform,
} from 'react-native';
import { auth } from '../Firebase/index';
import * as ImagePicker from 'expo-image-picker';
import logo from '../assets/littlelogo.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const AddEvent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [location, setLocation] = useState('');
  const [id, setId] = useState('');
  const [buttonColor, setButtonColor] = useState('#000000');
  const [showDatePicker, setShowDatePicker] = useState(false);
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

    if (!result.cancelled && result.assets && result.assets.length > 0) {
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
    if (!name || !description || !date || !selectedRegion || !image) {
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
          location: selectedRegion,
          like: 0,
          participants: 0,
          date: date,
        });
      })
      .then(() => {
        // Navigate to the ProfHomePage after the update
        navigation.reset({
          index: 0,
          routes: [{ name: 'ProfHomePage' }],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const regions = [
'Tunis(la capitale)',
'Sfax',
'Sousse',
'Kairouan',
'Bizerte',
'Gabès',
'Ariana',
'Gafsa',
'La Marsa',
'Tataouine',
'Djerba',
'Monastir',
'Hammamet',
'Mahdia',
'Nabeul',
'Tozeur',
'Matmata',
'Tabarka',
'Hammam Sousse',
'Carthage',
'El Kef',
'Douz',
'Kasserine',
'Medenine',
'Beja',
  ];

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
        style={styles.input1}
        placeholder="Description ..."
        value={description}
        onChangeText={(text) => setDescription(text)}
        underlineColorAndroid="transparent"
        multiline
        numberOfLines={15}
      />
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Icon name="calendar" size={20} color="#000000" style={styles.calendarIcon} />
        <Text style={styles.dateText} top={5}>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
          style={{ textAlign: 'center' }}
        />
      )}
      <Picker
        selectedValue={selectedRegion}
        style={styles.input2}
        onValueChange={(itemValue) => setSelectedRegion(itemValue)}
      >
        <Picker.Item label="Select a region" value="" />
        {regions.map((region, index) => (
          <Picker.Item key={index} label={region} value={region} />
        ))}
      </Picker>

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
            right: 20,
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
    paddingTop: 50,
  },
  inputContainer: {
    marginBottom: 20,
    alignItems: 'center',
    
  },
  addEventText: {
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
  input1: {
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
  input2: {
    backgroundColor: 'white',
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 20,
    borderRadius: 10,
    paddingLeft: 10,
  },
  button: {
    width: 170,
    height: 45,
    backgroundColor: 'green',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    right:-60,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
    right: -30,
  },
  image: {
    height: 120,
    width: 150,
    borderRadius: 10,
  },
  third: {
    flexDirection: 'row',
  },
  calendarIcon: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
});

export default AddEvent;
