import React, { useState } from 'react';
import {
  FlatList,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import TopPlacesCarousel from './constants/TopPlacesCarousel';
import Posts from './constants/Posts';
import WrapperHeader from './constants/WrapperHeader';

const Wrapper = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (text) => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500} // Ajoutez cette ligne et ajustez la valeur selon votre besoin
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F3F3F3"
        translucent={false}
      />

      <View style={styles.searchContainer}>
        <Image
          source={require('../assets/ProfHome/Smalllogo.png')}
          style={styles.logoImage}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher"
          onChangeText={handleSearch}
          backgroundColor="white"
        />
      </View>

      <View style={styles.contentContainer}>
        <TopPlacesCarousel filteredData={filteredData} />

        <View style={styles.postsContainer}>
          <Posts />
        </View>
      </View>

      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: -15,
    paddingHorizontal: -5,
    backgroundColor:"#F3F3F3"
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: "#F3F3F3"
  },
  logoImage: {
    width: 40,
    height: 45,
    marginRight: 20,
    top: 5,
    right: -10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    right: 5,
    top: 5,
    backgroundColor: "#F3F3F3"
  },
  contentContainer: {
    flex: 1,
  },
  postsContainer: {
    flex: 1,
    marginTop: -300,
  },
});

export default Wrapper;
