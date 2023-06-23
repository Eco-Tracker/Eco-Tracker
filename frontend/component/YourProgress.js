
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import axios from 'axios';
import { auth } from '../Firebase/index';
import { AuthContext } from './Context';
import { challenges } from './constants/data';
import logo from "../assets/littlelogo.png";
import ADDRESS_IP from '../API';

const YourProgress = () => {
  const [challenge, setChallenge] = useContext(AuthContext);
  console.log(challenge, "this is context")
  const [progressData, setProgressData] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [challengesData, setChallengesData] = useState([]);
  const [userId, setUserId] = useState('');
  const [isChallengeCompleted, setIsChallengeCompleted] = useState(false);
  const email = auth.currentUser.email;

  const fetching = () => {
    axios
      .get(`http://${ADDRESS_IP}:5000/users/email/${email}`)
      .then((res) => {
        setUserId(res.data[0].id);
        return res.data[0].id;
      })
      .then((userId) => {
        axios.get(`http://${ADDRESS_IP}:5000/userChallenge/all/${userId}`)
          .then(res => {
            const sortedData = res.data.sort((a, b) => {
              if (a.isCompleted && !b.isCompleted) return 1;
              if (!a.isCompleted && b.isCompleted) return -1;
              return 0;
            });
            setProgressData(sortedData);
            setCompletedChallenges(sortedData.filter(item => item.isCompleted));
          });

        axios.get(`http://${ADDRESS_IP}:5000/challenges/one/${challenge.id}`)
          .then((res) => {
            setChallengesData(res.data[0]);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    fetching();
  }, []);

  const handleCompleteChallenge = (id) => {
    axios.put(`http://${ADDRESS_IP}:5000/userChallenge/update/${id}`)
      .then(() => {
        // Update the progressData state to remove the completed challenge
        setProgressData(prevData => prevData.filter(item => item.id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const renderStars = (level) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starColor = i <= level ? '#E09618' : '#ccc';
      stars.push(<Icon name="star" size={20} color={starColor} key={i} />);
    }
    return stars;
  }

  return (
    <View style={styles.container}>
      <View style={styles.startContainer}>
        <Text style={styles.startText}>Start your journey</Text>
        <View style={styles.starContainer}>
          {renderStars(completedChallenges.length)}
        </View>
      </View>
      <ScrollView>
        <SafeAreaView style={{ padding: 20 }}>
          {progressData?.map((e, i) => {
            const isCompleted = e.isCompleted;
            console.log(e, "that is")
            return (
              <View
                style={styles.challengeContainer}
                key={i}
              >
                <Image source={logo} style={styles.logo} />
                <View>
                  <Text style={styles.name}>{challenge[0].name}</Text>
                  <Text style={styles.deadline}>{challenge[0].deadline.slice(0, 10)}</Text>
                  {!isCompleted ? (
                    <TouchableOpacity
                      onPress={() => {
                        handleCompleteChallenge(e.id);
                        console.log(e.id, 'this is the id of userchallenge');
                      }}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>Complete the Challenge</Text>
                    </TouchableOpacity>
                  ) : (
                    <Icon name="checkmark-done-circle" size={20} color="#55D85A" />
                  )}
                </View>
              </View>
            );
          })}
        </SafeAreaView>
      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ebe8e8',
  },
  startContainer: {
    padding: 10,
    width: 340,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  startText: {
    fontSize: 20,
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  safeAreaView: {
    flex: 1,
  },
  challengeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 20,
    height: 80,
    borderWidth: 1,
  },

  logo: {
    marginLeft: 10,
    width: 70,
    height: 70,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  deadline: {
    fontSize: 15,
    color: 'black',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 'auto',
  },
  button1: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 'auto',

  },
});

export default YourProgress;
