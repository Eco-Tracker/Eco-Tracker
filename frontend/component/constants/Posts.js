import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors, shadow, sizes, spacing} from './theme';
import FavoriteButton from './FavoriteButton';
import list from "./data"
import CommentButton from './CommentButton';

const CARD_WIDTH = sizes.width-45;
const CARD_HEIGHT = 300;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

const Posts = () => {
  return (
    <FlatList
      data={list}
      showsVerticalScrollIndicator={true}
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      keyExtractor={i => i.id}
      renderItem={({item, index}) => {
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
                <Image source={item.image} style={styles.image} />
              </View>
              <View style={styles.titleBox}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.favoritee}>
          <FavoriteButton style={styles.favorite} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoritee}>
          <CommentButton style={styles.comment} /></TouchableOpacity>
          
        
          </>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 10,
  },
  favorite: {
    position: 'absolute',
    top: 165,
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
    backgroundColor: '#fff',
    position: 'absolute',
    top: 165,
    right:280,
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
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
    fontSize: sizes.h3,
    color: colors.white,
  },
});

export default Posts;