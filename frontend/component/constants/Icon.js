import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import icons from '../../assets/Favorite.png';

const Icon = ({onPress, style, size = 32}) => {
  const image = (
    <Image
      source={icons}
      style={[{width: size, height: size, resizeMode: 'cover'}, style]}
    />
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{image}</TouchableOpacity>;
  }
  return image;
};

export default Icon;