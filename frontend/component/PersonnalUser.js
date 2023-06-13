import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StatusBar, Image, StyleSheet, Text, TouchableOpacity, ScrollView, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import pick from "../assets/addImage.png";
import Header from './constants/Header';
import { auth} from "../Firebase/index";
import { signOut} from "firebase/auth";
import axios from "axios";
import ADDRESS_IP from '../API'

export default function PersonnalUser({ navigation }) {
  const [user, setUser] = useState({});
 
  const mail = auth.currentUser.email;
  const fetchUser = () => {
    axios.get(`http://${ADDRESS_IP}:5000/users/email/${mail}`)
      .then((res) => {
        console.log(res.data, 'this is the id2');
        setUser(res.data);
        console.log(user, 'sarhane');
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
        navigation.navigate("Home2");
   };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: user.photo }}
            style={styles.userImage}
          />
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.texty}>Name</Text>
          <Text style={styles.userName}>{user.name}</Text>
          <View style={styles.border}></View>
          <Text style={styles.texty}>Email</Text>
          <Text style={styles.userEmail}>{user.mail}</Text>
          <View style={styles.border}></View>
          <Text style={styles.texty}>Phone Number</Text>
          <Text style={styles.userPhone}>{user.phone}</Text>
          <View style={styles.border}></View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: '#C7C1C0',
    borderWidth: 3,
    marginBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 30,
  },
  userEmail: {
    fontSize: 18,
    color: 'black',
    marginTop: 10,
    marginTop: 30,
  },
  texty: {
    color: 'black',
    fontSize: 20,
    marginTop: 20,
  },
  userPhone: {
    fontSize: 18,
    color: 'black',
    marginTop: 10,
  },
  border: {
    borderBottomColor: '#4CAF50',
    borderBottomWidth: 1,
    width: "90%",
    left: 20,
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    alignItems: 'center',
    padding: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  searchContainer: {
    left: -42,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoImage: {
    top: 16,
    left: 120,
    width: 40,
    height: 45,
    marginRight: 10,
  },
});
