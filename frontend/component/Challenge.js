import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import logo from "../assets/littlelogo.png"
import YourProgress from './YourProgress';
import Challenges from './Challenges';

const Challenge = () => {
  const [activeTab, setActiveTab] = useState('Challenges');

  const handleYourProgressPress = () => {
    setActiveTab('YourProgress');
  };

  const handleChallengesPress = () => {
    setActiveTab('Challenges');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.achievementText}>Achievements</Text>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'YourProgress' ? styles.tabActive : null,
          ]}
          onPress={handleYourProgressPress}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'YourProgress' ? styles.tabTextActive : null,
            ]}
          >
            Your Progress
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Challenges' ? styles.tabActive : null,
          ]}
          onPress={handleChallengesPress}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Challenges' ? styles.tabTextActive : null,
            ]}
          >
            Challenges
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cards}>
        {activeTab === 'YourProgress' ? <YourProgress /> : <Challenges /> }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFDFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 45,
    top: -10,
    justifyContent: 'center',
    backgroundColor: '#F3F3F3',
  },
  achievementText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  logo: {
    marginLeft: 10,
    width: 50,
    height: 50,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    gap: -20,
    top: -10,
    backgroundColor: '#F3F3F3',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#F3F3F3',
    marginHorizontal: 5,
    width: 150,
    zIndex: 5,
  },
  cards: {
    flex: 1,
    top:-10
},
  tabActive: {
    backgroundColor: '#4CAF50',
    zIndex: 1,
  },
  tabText: {
    color: '#4CAF50',
    fontSize: 15,
  },
  tabTextActive: {
    color: '#fff',
  },
});

export default Challenge;
