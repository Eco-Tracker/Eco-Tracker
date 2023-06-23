import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, sizes, spacing } from './theme';
import FavoriteButton from './FavoriteButton';
import CommentButton from './CommentButton';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import ADDRESS_IP from '../../API';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CARD_WIDTH = sizes.width - 45;
const CARD_HEIGHT = 300;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [s, sets] = useState(0);
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://${ADDRESS_IP}:5000/post/`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const incrementLikeCount = async (id, index) => {
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts];
      if (posts[index].post_Id === id && s === 0) {
        updatedPosts[index].like += 1;
        sets(2);
      } else {
        updatedPosts[index].like -= 1;
        sets(0);
      }
      return updatedPosts;
    });

    try {
      await axios.put(`http://${ADDRESS_IP}:5000/post/like/${id}`, {
        like: posts[index].like,
      });
    } catch (error) {
      console.error('Error updating like count:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {posts.map((item, index) => (
        <TouchableOpacity key={item.id} style={styles.cardContainer}>
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.favorite}
            onPress={() => {
              incrementLikeCount(item.post_Id, index);
              setIsLiked(!isLiked); // Inverse l'état actuel lors du clic
            }}
          >
            <View style={styles.likeContainer}>
              <Ionicons name="heart" size={20} color={isLiked ? 'red' : 'green'} />
              <Text style={styles.likeText}>{item.like}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.comment}
            onPress={() => navigation.navigate('CommentButton', { item })}
          >
            <Ionicons name="chatbox" size={20} color={'green'} />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    top: 10,
    paddingHorizontal: spacing.l,
  },
  cardContainer: {
    marginBottom: spacing.m,
    backgroundColor: '#F3F3F3',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: sizes.radius,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: spacing.m,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
    marginBottom: spacing.s,
    color: colors.black,
  },
  body: {
    fontSize: sizes.body,
    color: colors.gray,
  },
  favorite: {
    position: 'absolute',
    top: 220,
    right: spacing.l,
    zIndex: 1,
    top: 0,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 260,
    right: 40,
    backgroundColor: colors.white,
    padding: spacing.s,
    borderRadius: sizes.radius,
    shadowColor: 'green',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    
  },
  likeText: {
    marginLeft: spacing.xs,
    fontSize: sizes.body,
    color: colors.black,
  },
  comment: {
    position: 'absolute',
    top: 260,
    right: 20,
    backgroundColor: colors.white,
    padding: spacing.s,
    borderRadius: sizes.radius,
    shadowColor: 'green',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    
  },
});

export default Posts;
