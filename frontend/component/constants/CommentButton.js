import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, TextInput, Button } from 'react-native';
import { colors, shadow } from './theme';
import axios from 'axios';
import ADDRESS_IP from '../../API';
import { useNavigation, useRoute } from '@react-navigation/native';
import icons from '../../assets/comments.png';
import { auth } from "../../Firebase/index";


const CommentButton = () => {
  const [comments, setComments] = useState([]);
  const [bodyCom, setBodyCom] = useState('');
  const route = useRoute();
  const { item } = route.params;
  const post_id = item.post_Id;
  const user = auth.currentUser.email;
  console.log(user)


  const fetchComment = async () => {
    try {
      const response = await axios.get(`http://${ADDRESS_IP}:5000/comment/post/${post_id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  const handlePost = () => {
    axios.get(`http://${ADDRESS_IP}:5000/users/email/${user}`)
      .then((res) => {
        const userId = res.data[0].id;
        console.log(res.data[0].id)
        return axios.post(`http://${ADDRESS_IP}:5000/comment/add`, {
          id: userId,
          post_Id: post_id,
          bodyCom: bodyCom,
        })
      })
      .then((res) => {
        console.log(res.data);
        fetchComment(); // Refetch the comments after a new one has been added.
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <View
      style={[
        {
          backgroundColor: colors.white,
          padding: 4,
          borderRadius: 20,
        },
        shadow.light,
        style,
      ]}>
      <Comment icon={active ? 'FavoriteFilled' : 'Favorite'} size={24} />
    </View>
  );
};

export default CommentButton;
