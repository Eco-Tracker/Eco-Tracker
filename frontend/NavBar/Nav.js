import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
 
 const NavBar = () => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.content}>

      </View> */}

      <View style={styles.nav}>
        <TouchableOpacity>
          <Image source={require('../imagek/formnavbar.png')} style={styles.formNavBarButton} />

        </TouchableOpacity>

      <TouchableOpacity style={styles.addButton}>
        <Image source={require('../imagek/add.png')} style={styles.addButton} />

      </TouchableOpacity>

      <TouchableOpacity style={styles.homeButton}>

        <Image source={require('../imagek/home.png')} style={styles.homeButton} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.profilButton}>
          <Image source={require('../imagek/profil-removebg-preview.png')} style={styles.profilButton} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // content: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  
  profilButton: {
    top: 15,
    bottom: 12,
    width: 55,
    height: 55,
    alignSelf: 'center',
    left:73,
  },

  // formNavBarButton: {
  //   width: 25,
  //   height: 25,
  //   top: 10,
  //   left: 10,
  //   alignItems: 'center',
  //   paddingBottom: 0,
  //   color: 'red',

  // },
  nav:{

  },
  homeButton: {
    top: 44,
    bottom: 60,
    width: 60,
    height: 60,
    right:70,
    alignSelf: 'center',
  },
  addButton: {
    top: 60,
    bottom: 60,
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
});

export default NavBar;