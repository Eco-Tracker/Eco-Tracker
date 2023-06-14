import React, { useState, useEffect } from 'react';

import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button
} from 'react-native';
import {colors, shadow, sizes, spacing} from './theme';
import FavoriteButton from './FavoriteButton';
import list from "./data"
import CommentButton from './CommentButton';
import axios from 'axios';
import ADDRESS_IP from '../../API'
import Icon from 'react-native-vector-icons/FontAwesome';


const CARD_WIDTH = sizes.width-45;
const CARD_HEIGHT = 300;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [s, sets] = useState(0);



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://${ADDRESS_IP}:5000/post/`);
        console.log(response.data)
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);


  
  
  
  return (
    
    <FlatList
      data={posts}
      showsVerticalScrollIndicator={true}
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      keyExtractor={item => item.id}
      renderItem={({item, index}) => {

        var d= item.post_Id
        const incrementLikeCount = async (id, index) => {
          console.log(s)
          setPosts((prevPosts) => {
            const updatedPosts = [...prevPosts];
            if (d === id && s === 0) {
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
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.favoritee}>
          <Button
                title="Favorite"
                onPress={() => incrementLikeCount(item.post_Id,index)}
                style={styles.likeText}
              />
          <FavoriteButton style={styles.favorite} 
                onPress={() => incrementLikeCount(index)}/>
           
          </TouchableOpacity>
          <View style={styles.favoritee}>
        <Text style={styles.likeText} >{item.like}</Text>
      </View>
          <TouchableOpacity style={styles.favoritee}>
          <CommentButton style={styles.comment} /></TouchableOpacity>
          
        
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

export default Posts;