import React, { useState, useEffect } from 'react';
import { createStackNavigator, DefaultTheme } from "@react-navigation/stack";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors, shadow, sizes, spacing} from './theme';
import list from "./data";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import ADDRESS_IP from '../../API'
import { ImageBackground } from 'react-native';
const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 250;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

const TopPlacesCarousel = () => {
  const [event, setEvent]=useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://${ADDRESS_IP}:5000/event`);
        console.log(response.data)
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchEvent();
  }, []);

  return (
    <FlatList
      data={event}
      horizontal
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={i => i.id}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            style={{
              marginLeft: spacing.l,
              height: CARD_HEIGHT,
              backgroundColor: '#F3F3F3',
            
            }}
            onPress={() => navigation.navigate('EventDetails', {item})}>
            <View style={[styles.card]}>
              <View style={styles.imageBox}>
                <ImageBackground source={{uri: item.image}} style={styles.image} />
              </View>
              <View style={styles.titleBox}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.location}>{item.location}</Text>
                
              </View>
            </View>
          </TouchableOpacity>
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
    top: spacing.m,
    right: spacing.m,
    zIndex: 1,
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
    top: 10,
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

export default TopPlacesCarousel;