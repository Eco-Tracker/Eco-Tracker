import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import TopPlacesCarousel from './constants/TopPlacesCarousel';
import Posts from './constants/Posts';
import WrapperHeader from './constants/WrapperHeader';


const Wrapper = () => {
    return (
        <View style={{flexDirection:"column" , gap:10}}>
            <WrapperHeader />
     <TopPlacesCarousel />
     <Posts />
     </View>
    );
  };
  
 
  
  export default Wrapper;
