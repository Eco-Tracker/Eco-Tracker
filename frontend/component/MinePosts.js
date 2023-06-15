import React, { useState, useEffect  } from 'react';
import axios from "axios"
import ADDRESS_IP from '../API'
import { View, Image, TouchableOpacity, StyleSheet, TextInput, StatusBar, KeyboardAvoidingView, ScrollView, Text,FlatList } from 'react-native';
import {auth} from "../Firebase/index";
import {colors, shadow, sizes, spacing} from '../component/constants/theme';
import list from "../component/constants/data"
import DeleteButton from '../component/constants/DeleteButton';


const CARD_WIDTH = sizes.width-45;
const CARD_HEIGHT = 300;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;
const MinePosts = () => {
  const [data,setData]=useState([]); 
  const [id,setId]=useState('');
  const [idpost,setIdpost]=useState('');
  const [tracker,setTracker]=useState(false)

  const email = auth.currentUser.email

  const handleGet = () =>{
    axios.get(`http://${ADDRESS_IP}:5000/users/email/${email}`)
    .then((res)=>{
      console.log(res.data[0].id, 'this is the idAUthor')
      setId(res.data[0].id)
      return res.data.id; 
    })
    .then((userId)=>{ 
      return axios.get(`http://${ADDRESS_IP}:5000/post/user/${id}`)
    })
    .then((res)=>{
    //   console.log(res.data, "salam")
      setData(res.data)
    //   console.log(data, 'this is the data')
    })
    .catch((err)=>{
      console.log(err)
    })
  } 
    
  useEffect(() => {
    handleGet();
  }, [tracker]);
///post/ 
const handleDelete = () => {
    axios
      .get(`http://${ADDRESS_IP}:5000/post/user/${id}`)
      .then((res) => {
        console.log(res.data[0].post_Id, 'this is the ID POST');
        console.log(id, 'ahawa');
  
        const postId = res.data[0].post_Id; // Store the post ID in a separate variable
  
        setIdpost(postId);
        return postId; 
      })
      .then((postId) => { 
        console.log('hello', postId);
        return axios.delete(`http://${ADDRESS_IP}:5000/post/del/${postId}`);
      })
      .then((res) => {
          setTracker(!tracker)
          window.
        console.log(idpost, 'salam');
        console.log(res, 'this is the data');              
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  
 
  return (
    <FlatList
    data={data}
    showsVerticalScrollIndicator={true}
    snapToInterval={CARD_WIDTH_SPACING}
    decelerationRate="fast"
    keyExtractor={item => item.id}
    renderItem={({item, index}) => {

        const handleDelete = () => {
            axios
              .get(`http://${ADDRESS_IP}:5000/post/user/${id}`)
              .then((res) => {
                console.log(res.data[index].post_Id, 'this is the ID POST');
                console.log(id, 'ahawa');
          
                const postId = res.data[index].post_Id; // Store the post ID in a separate variable
            
                setIdpost(postId);
                return postId; 
              })
              .then((postId) => { 
                console.log('hello', postId);
                return axios.delete(`http://${ADDRESS_IP}:5000/post/del/${postId}`);
              })
              .then((res) => {
                console.log(idpost, 'salam');
                console.log(res, 'this is the data');              
                setData(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          };


      return (
          <>
        <TouchableOpacity
          style={{
            marginLeft: spacing.l,
            marginRight: index === list.length - 1 ? spacing.l : 0,
            height: 350,
            backgroundColor: '#F3F3F3',
          }}>
          <View style={[styles.card]}>
            <View style={styles.imageBox}>
              <Image source={{uri: item.image}} style={styles.image} />
            </View>
            <View style={styles.titleBox}>
              <Text style={styles.title}>{item.title}</Text>
              
            </View>
            <Text style={styles.location}>{item.body}</Text>
          </View>  
          <TouchableOpacity style={styles.favoritee} onPress={handleDelete} >
          <DeleteButton style={styles.comment} /></TouchableOpacity>
        </TouchableOpacity>
        </>   
      ); 
    }}
  />
);
};

const styles = StyleSheet.create({

likeText: {
  position: 'absolute',
  top: 155,
  right: 310,  // Adjust as needed
  color: colors.black, // Or any color you prefer
  fontSize: sizes.h3,
  paddingLeft: 10,  // Adjust as needed
  color: colors.black,  // Or any color you prefer
  fontSize: sizes.h3,
  
},
card: {
  width: CARD_WIDTH,
  height: CARD_HEIGHT,
  marginVertical: 10,
},
favorite: {
  position: 'absolute',
  top: 150,
  right: 330,
  
  // zIndex: 1,
},
favoritee: {
  backgroundColor: '#fff',
  position: 'absolute',
  top: 150,
  right: spacing.m,
  // zIndex: 1,
},

comment: {
  flexDirection: 'row',  // Add this to align the button and the likes count horizontally
  alignItems: 'center',  // This centers the button and the likes count vertically
  backgroundColor: '#fff',
  position: 'absolute',
  top: 150,
  right: 270,
},
imageBox: {
  width: CARD_WIDTH,
  height: CARD_HEIGHT,
  borderRadius: sizes.radius,
  overflow: 'hidden',
},
image: {
  width: CARD_WIDTH,
  height: CARD_HEIGHT,
  resizeMode: 'cover',
},
titleBox: {
  position: 'absolute',
  top: CARD_HEIGHT - 80,
  left: 16,
},
title: {
  bottom:220,

  fontSize: sizes.h2,
  fontWeight: 'bold',
  color: colors.white,
},
location: {
  // backgroundColor: '#fff',
bottom:150,
  fontSize: sizes.h3,
  color: colors.white,
},
});
export default MinePosts;
