import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ADDRESS_IP from '../API';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  FlatList,
} from 'react-native';
import { auth } from '../Firebase/index';
import { colors, shadow, sizes, spacing } from '../component/constants/theme';
import list from '../component/constants/data';
import DeleteButton from '../component/constants/DeleteButton';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from '../assets/littlelogo.png';

const CARD_WIDTH = sizes.width - 45;
const CARD_HEIGHT = 300;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

const MinePosts = ()
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const [idpost, setIdpost] = useState('');
  const [tracker, setTracker] = useState(false);
  let navigation = useNavigation();
  const email = auth.currentUser.email;

  const handleGet = () => {
    axios
      .get(`http://${ADDRESS_IP}:5000/users/email/${email}`)
      .then((res) => {
        console.log(res.data[0].id, 'this is the idAUthor');
        setId(res.data[0].id);
        return res.data.id;
      })
      .then((userId) => {
        return axios.get(`http://${ADDRESS_IP}:5000/post/user/${id}`);
      })
      .then((res) => {
        setData(res.data);
        setTracker(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGet();
  }, [tracker]);

  const handleDelete = () => {
    axios
      .get(`http://${ADDRESS_IP}:5000/post/user/${id}`)
      .then((res) => {
        console.log(res.data[0].post_Id, 'this is the ID POST');
        console.log(id, 'ahawa');

        const postId = res.data[0].post_Id;

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

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <TouchableOpacity onPress={goBack} style={styles.appButtonContainer}>
        <Icon name="arrow-back" size={34} color="green" />
      </TouchableOpacity>

      <FlatList
        data={data}
        showsVerticalScrollIndicator={true}
        snapToInterval={CARD_WIDTH_SPACING}
        decelerationRate="fast"
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                marginLeft: spacing.l,
                marginRight: index === list.length - 1 ? spacing.l : 0,
                height: 350,
                backgroundColor: '#F3F3F3',
              }}
            >
              <View style={[styles.card]}>
                <View style={styles.imageBox}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                </View>
                <View style={styles.titleBox}>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
                <Text style={styles.location}>{item.body}</Text>
              </View>
              <TouchableOpacity style={styles.favoritee} onPress={handleDelete}>
                <DeleteButton style={styles.comment} />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
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
  logo: {
    height: 70,
    width: 70,
    top: 20,
    right: -120,
  },

  appButtonContainer: {
    borderRadius: 6,
    alignItems: 'center',
    margin: 10,
    padding: 5,
    left: -130,
    top: 15,
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
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
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

export default MinePosts;
