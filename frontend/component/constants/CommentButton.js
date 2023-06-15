import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { colors, shadow } from './theme';
import axios from 'axios';
import ADDRESS_IP from '../../API';
import { useNavigation } from '@react-navigation/native';
import icons from '../../assets/comments.png';

const CommentButton = ({ item, style, onPress, size = 32 }) => {
  const [comments, setComments] = useState([]);
  const navigation = useNavigation();
  console.log(item, "this is it");
  var id = item
  console.log(id);

  const fetchComment = async () => {
    try {
      const response = await axios.get(`http://${ADDRESS_IP}:5000/comment/post/${id}`);
      console.log(response.data);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComment();
  }, [id]);

  const image = (
    <Image
      source={icons}
      style={[{ width: size, height: size, resizeMode: 'cover' }, style]}
    />
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{image}</TouchableOpacity>;
  }

  return (
    <View
      style={[
        {
          backgroundColor: colors.white,
          padding: 4,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
        },
        shadow.light,
        style,
      ]}
    >
      {image}
      <Text style={{ marginLeft: 5 }}>{comments.length}</Text>
    </View>
  );
};

export default CommentButton;
