import React, { useState, useEffect  } from 'react';
import axios from "axios"
import ADDRESS_IP from '../API'
import { View, Image, TouchableOpacity, StyleSheet, TextInput, StatusBar, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import {auth} from "../Firebase/index";
const ProfHomePage = () => {
  const [data,setData]=useState([]); 
  const [id,setId]=useState('');
  const email = auth.currentUser.email

  const handleGet = () =>{
    axios.get(`http://${ADDRESS_IP}:5000/proUsers/email/${email}`)
    .then((res)=>{
      console.log(res.data.id, 'this is the id')
      setId(res.data.id)
      console.log(id, 'amro')
      return res.data.id; 
    })
    .then((userId)=>{ 
      console.log(userId,'2 id ---')
      return axios.get(`http://${ADDRESS_IP}:5000/event/idUser/${userId}`)
    })
    .then((res)=>{
      console.log(res.data, "salam")
      setData(res.data)
      console.log(data, 'this is the data')
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  
  useEffect(() => {
    handleGet();
  }, []);

  return (
    <View style={styles.content}>
    {data.map((item) => (
      <View key={item.idEV}>
      <Image source={{uri: item.image}} style={styles.imageStyle}/>
      <Text style={styles.textStyle}>
        {item.name} 
      </Text>
      <Text >{item.description}</Text>
      <Text >{item.location}</Text>    
      <Text >{item.date}</Text>
      <Text>{item.participants}</Text>
      <Text>{item.like}</Text>
    </View>
    ))}
     {/* <View style={styles.formNavBarButton}>
        <TouchableOpacity>
          <Image
            source={require('../assets/ProfHome/formnavbar.png')}
            style={styles.formNavBarButtonImage}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Image source={require('../assets/ProfHome/add.png')} style={styles.addButton} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.homeButton}>
        <Image source={require('../assets/ProfHome/home.png')} style={styles.homeButton} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.profilButton}>
        <Image source={require('../assets/ProfHome/profil.png')} style={styles.profilButton} />
      </TouchableOpacity> */}
    </View>
  

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    top: -13,
  },
  content: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    
  },
  imageStyle: {
    width: 100, 
    height: 100, 
  },
  searchInput: {
    position: 'absolute',
    width: 280,
    height: 40,
    backgroundColor: '#FBFDFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    top: 15,
    left: 75,
    borderColor: '#E6E6E6',
  },
  logo: {
    position: 'absolute',
    top: 10,
    left: 30,
    width: 40,
    height: 43,
  },
  button: {
    marginBottom: 60,
  },
  profilButton: {
    position: 'absolute',
    width: 40,
    height: 50,
    top: 330,
    left: 150,
    alignItems: 'center',
    paddingBottom: 0,
  },
  formNavBarButton: {
    position: 'absolute',
    width: 425,
    height: 155,
    top: 605,
    left: -33,
    alignItems: 'center',
    paddingBottom: 0,
  },
  homeButton: {
    position: 'absolute',
    top: 330,
    left: 15,
    width: 47,
    height: 50,
  },
  addButton: {
    position: 'absolute',
    top: 305,
    bottom: 60,
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  
  shape: {
    position: 'absolute',
    top: 60,
    width: 360,
    height: 711,
    backgroundColor: '#F9F9F9',
    borderRadius: 20,
  },
  textStyle: {
    fontSize: 30,
    padding: 80,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    color: 'black',
    borderRadius: 20,
    width: 330,
    
  },
});

export default ProfHomePage;
