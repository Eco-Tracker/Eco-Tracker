import React, { useState } from 'react';
import {
  FlatList,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import TopPlacesCarousel from './constants/TopPlacesCarousel';
import Posts from './constants/Posts';
import WrapperHeader from './constants/WrapperHeader';
import Search from '../component/Search';

const Wrapper = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (text) => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <View style={{ flexDirection: 'column', gap: 10 }}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#F3F3F3"
          translucent={false}
        />

        <View style={styles.searchContainer}>
          <Image
            source={require('../assets/ProfHome/Smalllogo.png')}
            style={styles.logoImage}
          />
          <Search onSearch={handleSearch} />
        </View>

        <TopPlacesCarousel filteredData={filteredData} />
        <Posts />
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    left: -42,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoImage: {
    top: 16,
    left: 120,
    width: 40,
    height: 45,
    marginRight: 10,
  },
});

export default Wrapper;
