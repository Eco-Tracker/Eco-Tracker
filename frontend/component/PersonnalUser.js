import React, { useState } from 'react';
import { KeyboardAvoidingView, StatusBar, Image, StyleSheet, Text, TouchableOpacity, View ,TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import pick from "../assets/addImage.png";

export default function PersonnalUser({ navigation }) {

  const [selectedImage, setSelectedImage] = useState("https://www.pinclipart.com/picdir/middle/221-2217551_computer-user-clip-art.png");
  const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [userName, setUserName] = useState('')
    const [name, setName] = useState('')
  

 

  return (
   
    <KeyboardAvoidingView style={styles.container}
    behavior="padding">
      <View >
        <Text style={styles.text}>Cancel</Text>
        <View style={styles.inputContainer}>
         {selectedImage && (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Image source={selectedImage} style={{ width: 200, height: 200, borderRadius: 100, marginBottom: 10 ,borderColor: '#C7C1C0',borderWidth: 2}} />
    <Image source={pick} style={styles.pickk} />

  </View>
)}
      </View>
      </View>
      <View>
        <Text style={styles.texty} >Name</Text>
      <TextInput
      
           value={name}
           onChangeText={setName}
           style={styles.input}
           />
           <View style={styles.border}></View>
           <Text style={styles.texty1} >UserName</Text>
           <TextInput
     
           value={userName}
           onChangeText={setUserName}
           style={styles.input1}
           />
           <View style={styles.border1}></View>
           <Text style={styles.texty2} >PhoneNumber</Text>
           <TextInput
      
           value={phoneNumber}
           onChangeText={setPhoneNumber}
           style={styles.input2}
           />
           <View style={styles.border2}></View>
           <Text style={styles.texty3} >Email</Text>
           <TextInput
      
           value={email}
           onChangeText={setEmail}
           style={styles.input3}
           />
           <View style={styles.border3}></View>
           
          
      </View>

     

     

      <TouchableOpacity style={styles.Personalbutton} >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </KeyboardAvoidingView>
    
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
  
    justifyContent: 'center',
  
  },
  Personalbutton: {
    backgroundColor: '#4CAF50',
    width: 350,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    top:500,
    left:30
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  text:{
  marginLeft: 20,
  fontSize:20,
  top:25,
  
  },
  inputContainer:{
    width:"100%",
    top:150,
   },
   pickk : {
    width:50,
    height:50,
    top:-55,
    left:55,
    borderColor: '#C7C1C0',borderWidth: 2,
    borderRadius: 200,
    backgroundColor: '#000',
   },
   input:{
    backgroundColor:"white",
    borderRadius :10,
    top:300,
    left:40,
    fontSize:17,
    fontWeight: '500',
    
  },
  texty : {
    top:299,
    left:40,
    color:'gray'
  },
  border : {
    borderBottomColor: '#000',
    borderBottomWidth:1,
    top:310,
    width:"90%",
    left:20
  },
  input1:{
    backgroundColor:"white",
    top:320,
    left:40,
    fontSize:17,
    fontWeight: '500',
  },
  border1 : {
    borderBottomColor: '#000',
    borderBottomWidth:1,
    top:331,
    width:"90%",
    left:20
  },
  input2:{
    backgroundColor:"white",
    top:341,
    left:40,
    fontSize:17,
    fontWeight: '500',
  },
  border2 : {
    borderBottomColor: '#000',
    borderBottomWidth:1,
    top:351,
    width:"90%",
    left:20
  },
  input3:{
    backgroundColor:"white",
    top:361,
    left:40,
    fontSize:17,
    fontWeight: '500',
  },
  border3 : {
    borderBottomColor: '#000',
    borderBottomWidth:1,
    top:372,
    width:"90%",
    left:20
  },
  texty1 : {
    top:319,
    left:40,
    color:'gray'
  },
  texty2 : {
    top:338,
    left:40,
    color:'gray'
  },
  texty3 : {
    top:359,
    left:40,
    color:'gray'
  }
});
