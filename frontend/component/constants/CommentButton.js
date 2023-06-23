import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text, TextInput, Button, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import logo from "../../assets/littlelogo.png";

import ADDRESS_IP from '../../API';
import { auth } from '../../Firebase/index';

const CommentButton = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const post_id = item.post_Id;
  const user = auth.currentUser.email;

  const [comments, setComments] = useState([]);
  const [bodyCom, setBodyCom] = useState('');
  const [update, setUpdate] = useState('');
  const [userId, setUserId] = useState(null);

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

  useEffect(() => {
    axios.get(`http://${ADDRESS_IP}:5000/users/email/${user}`)
      .then((res) => {
        const userId = res.data[0].id;
        setUserId(userId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePost = () => {
    axios
      .get(`http://${ADDRESS_IP}:5000/users/email/${user}`)
      .then((res) => {
        const userId = res.data[0].id;
        return axios.post(`http://${ADDRESS_IP}:5000/comment/add`, {
          id: userId,
          post_Id: post_id,
          bodyCom: bodyCom,
        });
      })
      .then((res) => {
        fetchComment();
        setBodyCom('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (commentId, commentAuthorId) => {
    axios
      .get(`http://${ADDRESS_IP}:5000/users/email/${user}`)
      .then((res) => {
        const userId = res.data[0].id;
        if (commentAuthorId === userId) {
          return axios
            .delete(`http://${ADDRESS_IP}:5000/comment/${commentId}`)
            .then(() => {
              fetchComment();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("You are not authorized to delete this comment.");
        }
      });
  };

  const handleUpdate = (commentId, commentAuthorId) => {
    axios
      .get(`http://${ADDRESS_IP}:5000/users/email/${user}`)
      .then((res) => {
        const userId = res.data[0].id;
        if (commentAuthorId === userId) {
          return axios
            .put(`http://${ADDRESS_IP}:5000/comment/${commentId}`, { bodyCom: update })
            .then(() => {
              fetchComment();
              setUpdate('');
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("You are not authorized to update this comment.");
        }
      });
  };

  const goBack = () => {
    navigation.goBack();
  };
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <ScrollView style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="green" />
      </TouchableOpacity>
      <Text style={styles.header}>Comments</Text>
      {comments.map((comment) => (
        <View style={styles.commentContainer} key={comment.id}>
          <Text style={styles.commentText}>{comment.bodyCom}</Text>
          <View style={styles.buttonContainer}>
            {comment.authorId === userId && (
              <View style={styles.updateInputContainer}>
                <TextInput
                  style={styles.updateInput}
                  placeholder="Update comment"
                  value={update}
                  onChangeText={setUpdate}
                  
                />
                <TouchableOpacity onPress={() => handleUpdate(comment.id, comment.authorId)}>
                  <Icon name="create-outline" size={20} color="blue" />
                </TouchableOpacity> 
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(comment.id, comment.authorId)}>
                  <Icon name="trash-outline" size={20} color="red" />
                </TouchableOpacity>
              </View>
            )}
          </View>

        </View>
      ))}
      <TextInput
        style={styles.input}
        placeholder="Add comment"
        value={bodyCom}
        onChangeText={setBodyCom}
      />
      <Button title="Submit" onPress={handlePost} color="green" />
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop:-10,
    
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    padding: 10,
    zIndex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'green',
  },
  commentContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  commentText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  deleteButton: {
    padding: 2,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  buttonText: {
    color: '#ffffff',
  },
  updateInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  updateInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginRight: 10,
  },
  input: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#ffffff',
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    height: 50,
    width: 50,
    top: 10,
    alignSelf: 'center',

  },
 
});

export default CommentButton;
