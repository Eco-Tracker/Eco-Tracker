import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, TextInput, Button } from 'react-native';
import { colors, shadow } from './theme';
import axios from 'axios';
import ADDRESS_IP from '../../API';
import { useNavigation, useRoute } from '@react-navigation/native';
import icons from '../../assets/comments.png';
import { auth } from "../../Firebase/index";
import DeleteBut from './Delete';
import { sizes, spacing} from './theme';

const CARD_WIDTH = sizes.width-45;
const CARD_HEIGHT = 300;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;
const CommentButton = () => {
  const [comments, setComments] = useState([]);
  const [bodyCom, setBodyCom] = useState('');
  const [update, setUpdate] = useState('');
  const [idComment,setidComment]=useState('');
  const [tracker,setTracker]=useState(false);
  const [userId,setUserId]=useState('')
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
        console.log(res.data[0].id,"me")
        return axios.post(`http://${ADDRESS_IP}:5000/comment/add`, {
          id: userId,
          post_Id: post_id,
          bodyCom: bodyCom,
        })
      })
      .then((res) => {
        console.log(res.data);
        fetchComment();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleDelete = (commentId, commentAuthorId) => {
    axios.get(`http://${ADDRESS_IP}:5000/users/email/${user}`)
      .then((res) => {
        const userId = res.data[0].id;
        console.log(res.data[0].id,"me")
    if (commentAuthorId === userId) {
    return axios.delete(`http://${ADDRESS_IP}:5000/comment/${commentId}`)
        .then((res) => {
          console.log(commentId, 'Deleted');
          console.log(res, 'this is the data');
          fetchComment();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("You are not authorized to delete this comment.");
    }
  })
  };
  const handleUpdate = (commentId, commentAuthorId) => {
    axios.get(`http://${ADDRESS_IP}:5000/users/email/${user}`)
      .then((res) => {
        const userId = res.data[0].id;
        console.log(res.data[0].id,"me")
    if (commentAuthorId === userId) {
    return axios.put(`http://${ADDRESS_IP}:5000/comment/${commentId}`,{bodyCom:update})
        .then((res) => {
          console.log(commentId, 'Updated');
          console.log(res, 'this is the data');
          fetchComment();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("You are not authorized to update this comment.");
    }
  })
  };

  return (
    <View>
      {comments?.map((comment) => (
        <View key={comment?.id}>
          <Text>
            {comment?.bodyCom}
          </Text>
          <View>
            <TouchableOpacity
              style={styles.favoritee}
              onPress={() => handleDelete(comment?.id, comment?.authorId)}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
            </View>
            <View>
            <TouchableOpacity>
              <TextInput  placeholder="comment"
                   value={update}
                    onChangeText={setUpdate}
                 />
                 <Button title="Update" onPress={() => handleUpdate(comment?.id, comment?.authorId)} />
            </TouchableOpacity>
            </View>
        </View>
      ))}
      <TextInput
        placeholder="comment"
        value={bodyCom}
        onChangeText={setBodyCom}
      />
      <Button title="Submit" onPress={handlePost} />
      
    </View>
  );
};
const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentText: {
    flex: 1,
  },
  likeText: {
    position: 'absolute',
    top: 155,
    right: 310,
    color: colors.black,
    fontSize: sizes.h3,
    paddingLeft: 10,
    color: colors.black,
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
  },
  favoritee: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 150,
    right: spacing.m,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    bottom: 220,
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
    bottom: 150,
    fontSize: sizes.h3,
    color: colors.white,
  },
});
export default CommentButton;
