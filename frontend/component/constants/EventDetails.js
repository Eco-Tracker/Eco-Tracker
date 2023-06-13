import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors, shadow, sizes, spacing } from './theme';
import axios from 'axios';
import ADDRESS_IP from '../../API';
import { ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 250;

const EventDetails = ({ route }) => {
  const [event, setEvent] = useState([]);
  const { item } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://${ADDRESS_IP}:5000/event`);
        console.log(response.data);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchEvent();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Wrapper')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color={'#4CAF50'} />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Icon name="user" size={30} color={colors.black} />
            <Text style={styles.infoText}>{item.participants}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="heart" size={30} color={colors.red} />
            <Text style={styles.infoText}>{item.like}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    padding: 10,
  },
  imageContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: sizes.radius,
    overflow: 'hidden',
    marginBottom: spacing.l,
    top: 90,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  detailsContainer: {
    alignItems: 'center',
    top: 70,
  },
  title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    marginBottom: spacing.m,
  },
  location: {
    fontSize: sizes.h3,
    marginBottom: spacing.s,
  },
  description: {
    marginBottom: spacing.s,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.s,
    padding: 10,
    top: 15,
  },
  infoText: {
    marginLeft: spacing.xs,
  },
});

export default EventDetails;
