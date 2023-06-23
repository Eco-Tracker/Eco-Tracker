import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, StatusBar } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { auth, database } from '../Firebase/index.js';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors.js';
import { LogBox } from 'react-native';

export default function Chat() {
  LogBox.ignoreAllLogs();
  const [messages, setMessages] = useState([]);
  const [messagesLength, setMessagesLength] = useState(0);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }}>
          <AntDesign name="logout" size={24} color={colors.gray} style={{ marginRight: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const collectionRef = collection(database, 'eco-tracker');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log('querySnapshot unsusbscribe');
      setMessages(
        querySnapshot.docs.map((doc, i) => {
          i - 1 ? setMessagesLength(messages.length) : undefined;
          return {
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          };
        })
      );
    });

    return unsubscribe;
  }, [messagesLength, messages.length]);

  const onSend = useCallback((messages) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    setMessagesLength(messages.length);

    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, 'eco-tracker'), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  // Fonction de rendu personnalisée pour les bulles de message
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#dcf8c6', // Couleur de fond des messages reçus
          },
          right: {
            // Vous pouvez également personnaliser la couleur de fond des messages envoyés ici
          },
          
          right: {
            backgroundColor: props.currentMessage.user._id === auth.currentUser.email ? 'green' : '#fff', // Couleur de fond des messages reçus
          },
    right: {
      backgroundColor: 'green', // Couleur de fond des messages envoyés
    },
        }}
        textStyle={{
          left: {
            color: 'black', // Couleur du texte des messages reçus
          },
          right: {
            // Vous pouvez également personnaliser la couleur du texte des messages envoyés ici
          },
        }}
      />
    );
  };

  return (
    <>
      <StatusBar
        backgroundColor={'#fff'} // Remplacez colors.primary par la couleur de fond du chat
        barStyle="dark-content" // Style du texte de la barre de statut (dark-content pour du texte foncé)
      />

      {console.log(messagesLength, 'mehdiiiiiiiiiiiiiiiiiiiiiiiiiiii')}
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        showUserAvatar={true}
        keyboardShouldPersistTaps="never"
        onSend={onSend}
        messagesContainerStyle={{
          backgroundColor: '#fff',
        }}
        textInputStyle={{
          backgroundColor: '#fff',
          borderRadius: 20,
        }}
        user={{
          _id: auth?.currentUser?.email,
          avatar: auth?.currentUser?.photoURL,
        }}
        renderBubble={renderBubble} // Utilise la fonction de rendu personnalisée pour les bulles de message
      />
    </>
  );
}
