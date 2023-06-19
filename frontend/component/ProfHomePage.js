import React, { useState, useEffect } from 'react';
import axios from "axios";
import ADDRESS_IP from '../API';
import { View, Image, TouchableOpacity, StyleSheet, TextInput, StatusBar, ScrollView, Text } from 'react-native';
import { auth } from "../Firebase/index";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import SmallLogo from '../assets/ProfHome/Smalllogo.png';

const ProfHomePage = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const [searchText, setSearchText] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const email = auth.currentUser.email;
  const navigation = useNavigation();

  const handleGet = () => {
    axios.get(`http://${ADDRESS_IP}:5000/proUsers/email/${email}`)
      .then((res) => {
        console.log(res.data.id, 'this is the id');
        setId(res.data.id);
        console.log(id, 'amro');
        return res.data.id;
      })
      .then((userId) => {
        console.log(userId, '2 id ---');
        return axios.get(`http://${ADDRESS_IP}:5000/event/idUser/${userId}`);
      })
      .then((res) => {
        console.log(res.data, "salam");
        setData(res.data);
        console.log(data, 'this is the data');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    handleGet();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://${ADDRESS_IP}:5000/event/${id}`)
      .then(() => {
        // Refresh the page by calling handleGet
        handleGet();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = () => {
    // Filter the data based on search text (name or location)
    const filteredData = data.filter(item => {
      const name = item.name.toLowerCase();
      const location = item.location.toLowerCase();
      const search = searchText.toLowerCase();
      return name.includes(search) || location.includes(search);
    });
    return filteredData;
  };

  const handleUpdateEvent = (item) => {
    navigation.navigate('UpdateEvent', { item });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F3F3" />
      <View style={styles.headerContainer}>
        <Image source={SmallLogo} style={styles.logo} />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or location"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
        </View>
      </View>
      <ScrollView style={styles.content}>
        {handleSearch()?.map((item) => (
          <View key={item?.idEV} style={styles.cardContainer}>
            <View style={styles.imageContainer}>
              {item?.image ? (
                <Image
                  source={{ uri: item.image }}
                  style={styles.imageStyle}
                  borderRadius={10}
                />
              ) : null}
              <TouchableOpacity
                style={styles.favorite}
                onPress={() => handleUpdateEvent(item)}
              >
                <Icon name="ellipsis-h" size={24} color="green" />
              </TouchableOpacity>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{item?.name}</Text>
                <View style={styles.infoContainer}>
                  <View style={styles.locationContainer}>
                    <Icon name="map-marker" size={14} color="green" style={styles.icon} />
                    <Text style={styles.locationText}>{item?.location}</Text>
                  </View>
                  <View style={styles.dateContainer}>
                    <Icon name="calendar" size={14} color="green" style={styles.icon} />
                    <Text style={styles.infoText}>{item?.date.slice(0, 10)}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.descriptionContainer}>
                <Text
                  numberOfLines={showFullDescription ? undefined : 2}
                  ellipsizeMode="tail"
                  style={styles.descriptionText}
                >
                  {item?.description}
                </Text>
                {!showFullDescription && (
                  <TouchableOpacity
                    style={styles.seeMoreButton}
                    onPress={() => setShowFullDescription(true)}
                  >
                    <Text style={styles.seeMoreText}>See More</Text>
                  </TouchableOpacity>
                )}
                {showFullDescription && (
                  <TouchableOpacity
                    style={styles.seeMoreButton}
                    onPress={() => setShowFullDescription(false)}
                  >
                    <Text style={styles.seeMoreText}>See Less</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.infoContainer}>
                <Icon name="heart" size={14} color="green" style={styles.icon} />
                <Text style={styles.infoText}>{item?.like}</Text>
                <Icon name="users" size={14} color="green" style={styles.icon} />
                <Text style={styles.infoText}>{item?.participants}</Text>
                <TouchableOpacity
                  onPress={() => handleDelete(item?.idEV)}
                  style={styles.icon2}
                >
                  <Icon name="trash" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 5,
    backgroundColor: '#F3F3F3',
    top: 5,
  },
  logo: {
    width: 40,
    height: 44,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginLeft: 10,
    borderWidth: 1, // Add border width
    borderColor: '#999', // Add border color
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 2,
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginRight: 10,
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  imageStyle: {
    width: 320,
    height: 230,
  },
  cardContent: {
    marginTop: 10,
    width: '100%',
    alignItems: 'flex-start',
  },
  textContainer: {
    paddingHorizontal: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#777',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    left: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#777',
    marginRight: 10,
  },
  descriptionContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#777',
  },
  seeMoreButton: {
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  seeMoreText: {
    color: 'green',
    fontWeight: 'bold',
  },
  favorite: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
  icon2: {
    marginLeft: 220,
  },
});

export default ProfHomePage;
