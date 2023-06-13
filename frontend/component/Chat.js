import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Chat = () => {
    const navigation = useNavigation();

    

    return (
        <View style={styles.container}>
  
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
    formNavBarButton: {
        position: 'absolute',
        width: 425,
        height: 155,
        top: 300,
        left: -16,
        alignItems: 'center',
        paddingBottom: 0,
    },
    homeButton: {
        position: 'absolute',
        top: 660,
        left: 13,
        width: 47,
        height: 50,
    },
    homeButtonImage: {
        width: 47,
        height: 50,
    },
    addButton: {
        position: 'absolute',
        top: 305,
        bottom: 60,
        width: 50,
        height: 50,
        alignSelf: 'center',
    },
    profilButton: {
        position: 'absolute',
        width: 40,
        height: 50,
        top: 330,
        left: 152,
        alignItems: 'center',
        paddingBottom: 0,
    },
    challengeButton: {
        position: 'absolute',
        width: 82,
        height: 50,
        top: 330,
        left: 115,
        alignItems: 'center',
        paddingBottom: 0,
    },
    chatButton: {
        position: 'absolute',
        width: 44,
        height: 46,
        top: 330,
        left: 45,
        alignItems: 'center',
        paddingBottom: 0,
    },
});

export default Chat;
