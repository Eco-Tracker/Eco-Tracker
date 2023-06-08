import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://192.168.1.3:5000/post/');
        console.log(response.data)
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.description}>{item.body}</Text>
      <Text style={styles.description}>{item.title}</Text>
      <Text style={styles.description}>{item.like}</Text>
      <Text style={styles.type}>{item.type}</Text>
      {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.post_Id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listContainer: {
    flexGrow: 1,
  },
  postContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  type: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
});

export default PostList;

