import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  TextInput,
} from 'react-native';
import Header from './constants/Header';
import { auth } from '../Firebase/index';
import { signOut } from 'firebase/auth';
import axios from 'axios';
import ADDRESS_IP from '../API';
import logo from '../assets/littlelogo.png';

export default function PersonnalUser({ navigation }) {
  const [users, setUser] = useState([]);
  const mail = auth.currentUser.email;

  const fetchUser = () => {
    axios
      .get(`http://${ADDRESS_IP}:5000/users/email/${mail}`)
      .then((res) => {
        console.log(res.data, 'this is the user data');
        setUser(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onLogout = () => {
    auth.signOut();

    navigation.navigate('Home2');

  };

  return (
    <View style={styles.container}>      
      <StatusBar style={styles.statusBar} />
      <Image source={logo} style={styles.logo} />
      
        {users && (
          <View style={styles.content}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: users.photo }} style={styles.userImage} />
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.texty}>{users.name}</Text>
              <View style={styles.border} />
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.texty}>{users.mail}</Text>
              <View style={styles.border} />
              <Text style={styles.label}>Phone Number:</Text>
              <Text style={styles.texty}>{users.phone}</Text>
              <View style={styles.border} />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('UpdatePers', { user: users });
              }}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                navigation.navigate('MinePosts', { user: users });
              }}
            >
              <Text style={styles.buttonText}>My Posts</Text>
            </TouchableOpacity>
          </View>
        )}
      
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    top: 80,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:20,
  },
  
  imageContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  userImage: {
    width: 110,
    height: 110,
    borderRadius: 75,
    borderColor: '#C7C1C0',
    borderWidth: 3,
    marginBottom: 20,
    top:30,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 40,
    margin:0,
    top: -15,
    padding:40,
  },
  userName: {
    fontSize: 12,
    marginTop: 15,
  },
  userEmail: {
    fontSize: 12,
    color: 'black',
    marginTop: 10,

  },
  texty: {
    color: 'black',
    fontSize: 15,
    marginTop: 12,
    fontWeight: 'bold',
  },
  userPhone: {
    fontSize: 12,
    color: 'black',
    marginTop: 10,
  },
  border: {
    borderBottomColor: '#4CAF50',
    borderBottomWidth: 1,
    width: "90%",
    alignSelf: 'center',
    marginTop: 10,
  }, 
  updateButton: {
    backgroundColor: '#9AC341',
    borderRadius: 12,
    alignItems: 'center',
    padding: 10,
    margin: 10,
    top: -30,
  },
  button: {
    backgroundColor: '#9AC341',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 44,
    marginBottom: 5,
    margin: 10,
    padding: 5,
    top: -70,
  },
  button2: {
    backgroundColor: '#9AC341',
    borderRadius: 12,
    alignItems: 'center',
    
    marginBottom: 5,
    margin: 100,
    right:-120,
    padding: 5,
    top: -720,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'grey',
    borderRadius: 6,
    alignItems: 'center',
    margin: 10,
    padding: 5,
    top: -70,

  },
  logo: {
    height: 60,
    width: 60,
    top: 35,

    left: -120,
  },
});
