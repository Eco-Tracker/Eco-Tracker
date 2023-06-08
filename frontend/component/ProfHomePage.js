import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, TextInput, StatusBar, KeyboardAvoidingView, ScrollView, Text } from 'react-native';

const ProfHomePage = () => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (text) => {
    setSearchText(text);
  };

  const handleSearch = () => {
    // Effectuez ici les actions à réaliser lorsque l'utilisateur clique sur la recherche
    console.log('Recherche effectuée:', searchText);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F3F3F3" barStyle="dark-content" />

      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchText}
        onChangeText={handleInputChange}
        onSubmitEditing={handleSearch}
      />
      
      <View style={styles.shape} />

      <ScrollView style={styles.scrollView}>
        <KeyboardAvoidingView behavior="padding" style={styles.content}>
          <FlatListDemo />
        </KeyboardAvoidingView>
      </ScrollView>

      <View style={styles.formNavBarButton}>
        <TouchableOpacity>
          <Image source={require('../assets/ProfHome/formnavbar.png')} style={styles.formNavBarButtonImage} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Image source={require('../assets/ProfHome/add.png')} style={styles.addButton} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.homeButton}>
        <Image source={require('../assets/ProfHome/home.png')} style={styles.homeButton} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.profilButton}>
        <Image source={require('../assets/ProfHome/profil.png')} style={styles.profilButton} />
      </TouchableOpacity>

      <Image source={require('../assets/ProfHome/Smalllogo.png')} style={styles.logo} />
    </View>
  );
};

const FlatListDemo = () => {
  const names = [
    {
      index: "1",
      name: "Arbi",
    },
    {
      index: "2",
      name: "miraoui",
    },
    {
      index: "3",
      name: "sabrine",
    },
    {
      index: "4",
      name: "mahdi",
    },
  ];

  return (
    <View style={styles.content}>
      {names.map((item) => (
        <Text key={item.index} style={styles.textStyle}>
          {item.name}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    top: 12,
  },
  content: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  searchInput: {
    width: 240,
    height: 40,
    backgroundColor: '#FBFDFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    top: 10,
    left: 55,
    borderColor: '#E6E6E6',
  },
  logo: {
    position: 'absolute',
    top: 10,
    left: 70,
    width: 40,
    height: 43,
  },
  button: {
    marginBottom: 60,
  },
  profilButton: {
    position: 'absolute',
    width: 45,
    height: 55,
    top: 325,
    left: 150,
    alignItems: 'center',
    paddingBottom: 0,
  },
  formNavBarButton: {
    position: 'absolute',
    width: 425,
    height: 155,
    top: 595,
    left: -33,
    alignItems: 'center',
    paddingBottom: 0,
  },
  homeButton: {
    position: 'absolute',
    top: 325,
    left: 15,
    width: 57,
    height: 60,
  },
  addButton: {
    position: 'absolute',
    top: 305,
    bottom: 60,
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
  formNavBarButtonImage: {
    width: 425,
    height: 155,
  },
  shape: {
    position: 'absolute',
    top: 70,
    width: 360,
    height: 711,
    backgroundColor: '#F9F9F9',
    borderRadius: 20,
  },
  textStyle: {
    fontSize: 30,
    padding: 80,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    color: 'black',
    borderRadius: 20,
  },
});

export default ProfHomePage;
