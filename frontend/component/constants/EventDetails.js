import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import FavoriteButton from './FavoriteButton';
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
  const [s, sets] = useState(0);
  const [x , setx]=useState(0);
  const { item, index } = route.params;
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
  var d= item.idEV
  // console.log(item.like, "like")
        const incrementLikeCount = async (id, index) => {
          console.log(s)
          setEvent((prevEvents) => {
            const updatedPosts = [...prevEvents];
            if (d === id && s === 0) {
              item.like += 1;
              sets(2);
            } else {
              item.like -= 1;
              sets(0);
            }
            return updatedPosts;
          });
          console.log(item.like,"hey")
          try {
            await axios.put(`http://${ADDRESS_IP}:5000/event/like/${id}`, {
              like: item.like,
            
            });
          } catch (error) {
            console.error('Error updating like count:', error);
          }
        };
        console.log(item.participants, "participants")
              const incrementPartCount = async (id, index) => {
                console.log(x)
                setEvent((prevEvents) => {
                  const updatedPosts = [...prevEvents];
                  if (d === id && x === 0) {
                    item.participants += 1;
                    setx(2);
                  } else {
                    item.participants -= 1;
                    setx(0);
                  }
                  return updatedPosts;
                });
              
                try {
                  await axios.put(`http://${ADDRESS_IP}:5000/event/part/${id}`, {
                    participants: item.participants,
                  });
                } catch (error) {
                  console.error('Error updating like count:', error);
                }
              };
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
            <Icon name="user" size={30} color={colors.black}  onPress={() => incrementPartCount(item.idEV,index)}/>
            <Text style={styles.infoText}>{item.participants}</Text>
          </View>
          <TouchableOpacity style={styles.favoritee} >
          {/* <Button
                title="Favorite"
                onPress={() => incrementLikeCount(item.idEV,index)}
                style={styles.likeText}
              /> */}
           
          </TouchableOpacity>
          <View style={styles.infoItem}>
            <Icon name="heart" size={30} color={colors.red} onPress={() => incrementLikeCount(item.idEV,index)} />
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
