import React, { useState, useEffect } from "react";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import { View, Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StatusBar, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/index";
import ADDRESS_IP from '../API'
const HomePro = ({ navigation }) => {
  const [name, setname] = useState('');
  const [mail, setmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [phone_, setphone_] = useState('');

  const [photo, setphoto] = useState('');


  return (
    
  )
}

export default HomePro;