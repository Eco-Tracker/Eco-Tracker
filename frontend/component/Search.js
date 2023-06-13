import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const Search = ({ onSearch }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        placeholderTextColor="#AFAFAF" 
        onChangeText={onSearch}
        style={styles.textInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    paddingHorizontal: 80,
    height: 40,
    borderColor: '#4CAF50',
    borderBottomWidth: 0.5,
    justifyContent: 'space-around',
    marginLeft: 120,
    top:25, 
  },
});

export default Search;
