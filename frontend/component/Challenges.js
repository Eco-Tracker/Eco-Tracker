
import React, { useState, useEffect, useContext, createContext } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Image,
  SafeAreaView,
  ScrollView
} from 'react-native';
import logo from "../assets/littlelogo.png"
import axios from 'axios';
import ADDRESS_IP from '../API'
import { auth } from '../Firebase/index';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './Context';

const Challenges = () => {
  const [challenges, setChallenges] = useContext(AuthContext)
  const [idUser, setUserId] = useState('');
  const [idChallenge, setChallengeId] = useState('');
  const [data, setData] = useState([]);
  const email = auth.currentUser.email;
  const navigation = useNavigation();

  useEffect(() => {
    axios.get(`http://${ADDRESS_IP}:5000/challanges/get-all`).then(res => setData(res.data));
  }, []);

  const handleChallangeStart = (idChallenge) => {
    console.log(challenges, 'ss')
    axios
      .get(`http://${ADDRESS_IP}:5000/users/email/${email}`)
      .then((res) => {
        console.log(email, "wow");
        setUserId(res.data[0].id);
        console.log(idChallenge, "this is 1");
        return res.data[0].id;
      }).then((idUser) => {
        console.log(idChallenge)
        axios.post(`http://${ADDRESS_IP}:5000/userChallenge/start`, {
          idUser,
          idChallenge
        })

        console.log(idChallenge, "this is the challenge id", idUser, "this is 2");
      });
  };

  return (
    <AuthContext.Provider value={[challenges, setChallenges]}>
      <View style={styles.container}>
        <ScrollView>
          {data?.map((e, i) => (
            <View style={styles.challengeCard} key={i}>
              <Image source={logo} style={styles.logo} />
              <View style={styles.challengeDetails}>
                <Text style={styles.challengeName}>{e.name}</Text>
                <Text style={styles.challengePoints}>{e.points}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleChallangeStart(e.id);
                  setChallenges([{
                    id: e.id,
                    name: e.name,
                    description: e.description,
                    deadline: e.deadline,
                    points: e.points,
                    isCompleted: e.isCompleted
                  }]);
                  console.log(e.id);
                }}
                style={styles.addButton}
              >
                <Text style={styles.buttonText}>Add To My Challenges</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebe8e8',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  challengeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    height: 150,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },

  logo: {
    marginLeft: 10,
    width: 70,
    height: 70,
    marginRight: 10
  },
  challengeDetails: {
    flex: 1,
    top: -70,
    marginLeft: 90,
    justifyContent: 'center',
  },
  challengeName: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: -10,
  },
  challengePoints: {
    fontSize: 15,
    color: '#4CAF50',
    top: 15,
    marginBottom: -10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    top: -10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    right:10
  },
});

export default Challenges;
