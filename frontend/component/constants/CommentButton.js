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
import DeleteButton from '../../component/constants/DeleteButton';
import Icon from 'react-native-vector-icons/Ionicons';


const CARD_WIDTH = sizes.width-45;
const CARD_HEIGHT = 300;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;
const CommentButton = () => {
  let navigation=useNavigation();

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
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={goBack} style={styles.appButtonContainer}>
  <Icon name="arrow-back" size={34} color="green" />
</TouchableOpacity>
      <Text style={styles.header}>Comments</Text>
      {comments?.map((comment) => (
        <View style={styles.commentContainer} key={comment?.id}>
          <Text style={styles.commentText}>
            {comment?.bodyCom}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDelete(comment?.id, comment?.authorId)}
            >
              <DeleteButton/>
            </TouchableOpacity>
            <View style={styles.updateInputContainer}>
              <TextInput  
                style={styles.updateInput} 
                placeholder="Update comment"
                value={update}
                onChangeText={setUpdate}
              />
              <Button  title="Update" onPress={() => handleUpdate(comment?.id, comment?.authorId)} />
            </View>
            </View>
        </View>
      ))}
      <TextInput
        style={styles.input}
        placeholder="Add comment"
        value={bodyCom}
        onChangeText={setBodyCom}
      />
      <Button  style ={{color: 'green'}}title="Submit" onPress={handlePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    borderRadius: 6,
    alignItems: 'center',
    margin: 10,
    padding: 5,
    left: -130,
    top: 85,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  header: {
    top:35,
    fontSize: 24,
    fontWeight: 'bold',
textAlign: 'center',
    marginBottom: 20,
    color: 'green'
  },
  commentContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginVertical: 10,
    marginTop: 40

  },
  commentText: {
    fontSize: 16
  },
  input: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginTop: 40
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    color:'green'

  },
  updateInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  updateInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginRight: 10
  },
 
});
export default CommentButton;
