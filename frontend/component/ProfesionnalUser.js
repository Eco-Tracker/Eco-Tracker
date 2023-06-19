import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StatusBar, Image, StyleSheet, Text, Button, TouchableOpacity, ScrollView, View, TextInput } from 'react-native';
import { auth } from "../Firebase/index";
import { signOut } from 'firebase/auth';
import axios from "axios";
import ADDRESS_IP from '../API';
import logo from "../assets/littlelogo.png";

export default function ProfesionnalUser({ navigation }) {
  const [proUser, setProUser] = useState([]);
  const user = auth.currentUser.email;
  console.log(user);

  const fetchUser = () => {
    axios.get(`http://${ADDRESS_IP}:5000/proUsers/email/${user}`)
      .then((res) => {
        console.log(res.data, 'this is the id2');
        setProUser(res.data);
        console.log(proUser.id, 'sarhane');
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
    <View style={styles.container}>
      <StatusBar style={styles.container} />
      <Image source={logo} style={styles.logo} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {proUser && (
          <View>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: proUser.picture }}
                style={styles.userImage}
              />
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.texty}>Name</Text>
              <Text style={styles.userName}>{proUser.professionalName}</Text>
              <View style={styles.border}></View>
              <Text style={styles.texty}>Email</Text>
              <Text style={styles.userEmail}>{proUser.professionalMail}</Text>
              <View style={styles.border}></View>
              <Text style={styles.texty}>Phone Number</Text>
              <Text style={styles.userPhone}>{proUser.contactNumber}</Text>
              <View style={styles.border}></View>
              <Text style={styles.texty}>Code Fiscal</Text>
              <Text style={styles.userPhone}>{proUser.codeFiscal}</Text>
              <View style={styles.border}></View>
            </View>
            <View>
              <TouchableOpacity style={styles.updateButton}
                onPress={() => {
                  navigation.navigate('UpdateProfile', { user: proUser });
                }}>
                <Text style={styles.ButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                <Text style={styles.logoutButtonText}>Log Out</Text>
              </TouchableOpacity>
            </View>

          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top:-50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
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
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
    top: -35,
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
  logoutButton: {
    backgroundColor: 'grey',
    borderRadius: 6,
    alignItems: 'center',
    margin: 10,
    padding: 5,
    top: -30,
  
  },
  ButtonText: {
    color: 'white',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    
  },
  logo: {
    height: 50,
    width: 50,
    top: 70,
    left: -120,
  },
});
