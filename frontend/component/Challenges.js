import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image ,
  SafeAreaView,
  ScrollView,} from 'react-native';
import { challenges } from './constants/data';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faStar } from '@fortawesome/free-regular-svg-icons/faStar'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import logo from "../assets/littlelogo.png"



const Challenges = () => {
 
  return (
    <View style={{}}>
      <ScrollView>
      <SafeAreaView  style={{padding:20}}>
        {challenges.map((e,i)=>(
          <View style={{ flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingTop: 20,
          padding:10,
          top:80,
          gap:20
          ,backgroundColor:"#ebe8e8",
        marginBottom:20,
        borderRadius:20,
        height:80,
        }} 
          key={i}>
              <Image source={logo} style={styles.logo} />
            <View>
              <Text style={{fontWeight:"bold",fontSize:17,top:-4}}>
              {e.points}
              </Text>
              <Text style={{fontSize:15,color:"#4CAF50",top:5}}>
{e.deadline}
              </Text>
            </View>
          </View>
        ))}
      </SafeAreaView >
      </ScrollView>
      </View>
    
  );

      }

const styles = StyleSheet.create({
  logo: {
    marginLeft: 10,
    width: 70,
    height: 70,
    right:10
  },
});

export default Challenges;