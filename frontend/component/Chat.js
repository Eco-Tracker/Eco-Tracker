import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
  } from 'react';
  import { TouchableOpacity, Text,View, StyleSheet} from 'react-native';
  import { GiftedChat } from 'react-native-gifted-chat';
 
  import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
  } from 'firebase/firestore';
  import { auth, database } from '../Firebase/index.js';
  import { useNavigation } from '@react-navigation/native';
  import { AntDesign } from '@expo/vector-icons';
  import colors from '../colors.js';
  import { LogBox } from "react-native";
  
  export default function Chat() {
    LogBox.ignoreAllLogs();
    const [messages, setMessages] = useState([]);
    const [messagesLength, setMessagesLength] = useState(0);
  
    const navigation = useNavigation();
  
  
  
  
  
  
  
    
    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{
              marginRight: 10
            }}
          >
            <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 10}}/>
          </TouchableOpacity>
        )
      });
    }, [navigation]);
  
    useEffect(() => {
  
        const collectionRef = collection(database, 'eco-tracker');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));
  
    const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('querySnapshot unsusbscribe');
          setMessages(
            querySnapshot.docs.map((doc,i) => {
              i-1?setMessagesLength(messages.length)  :undefined
              return{
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user
            }
          })
          );
          
        });
    return unsubscribe; 
      }, [messagesLength,messages.length]);
   
    const onSend = useCallback((messages ) => {  
     //alert(JSON.stringify(messages))
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages)
        );
        setMessagesLength(messages.length)
  
        // setMessages([...messages, ...messages]);
        const { _id, createdAt, text, user } = messages[0];    
        addDoc(collection(database,'eco-tracker'),{
          _id,
          createdAt,
          text,
          user
        });
      
      }, []);
  
      return (
        // <View>
        //         {messages && messages.map((message) => (
        //   <Text key={message}>{message.text}</Text>
        // ))}
        // </View>
        // <>
        //   {messages.map(message => (
        //     <Text key={message._id}>{message.text}</Text>
        //   ))}
        // </>
        <> 
          {console.log(messagesLength,"mehdiiiiiiiiiiiiiiiiiiiiiiiiiiii")}
         <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={true}
          showUserAvatar={false}
          keyboardShouldPersistTaps='never'
           onSend={messages => onSend(messages)}
          messagesContainerStyle={{
            backgroundColor: '#fff'
          }}
          textInputStyle={{
            backgroundColor: '#fff',
            borderRadius: 20,
          }}
          user={{
            _id: auth?.currentUser?.email,
            avatar: 'https://i.pravatar.cc/300'
          }}
        />      
  
        </>
      );
  }
  