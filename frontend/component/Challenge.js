import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import logo from "../assets/littlelogo.png"
import YourProgress from './YourProgress';
import Challenges from './Challenges';




const Challenge = () => {
  const [activeTab, setActiveTab] = useState('Confirm');

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
            activeTab === 'Confirm' ? styles.tabActive : null,
          ]}
          onPress={() => setActiveTab('Confirm')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Confirm' ? styles.tabTextActive : null,
            ]}
          >
            Your Progress
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Cancel' ? styles.tabActive : null,
          ]}
          onPress={() => setActiveTab('Cancel')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Cancel' ? styles.tabTextActive : null,
            ]}
          >
            Challenges
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{}}>
      {activeTab === 'Confirm' ? <YourProgress /> : <Challenges />}</View>
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
    paddingTop: 20,
    top:40,
    gap:150,
    
  },
  achievementText: {
    fontSize: 25,
    fontWeight: 'bold',
    left:25
  },
  logo: {
    marginLeft: 10,
    width: 50,
    height: 50,
    right:40
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    gap:-20,
    top:40
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#F3F3F3',
    marginHorizontal: 5,
    width: 150,
    zIndex:5
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
