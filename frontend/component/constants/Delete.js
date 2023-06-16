import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import icons from '../../assets/del.jpg';

const DeleteBut = ({ onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Image source={icons} style={{ width: 24, height: 24 }} />
    </TouchableOpacity>
  );
};

export default DeleteBut;