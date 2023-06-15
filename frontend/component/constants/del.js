import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import icons from '../../assets/del.jpg';

const Del = ({onPress, style, size = 32}) => {
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

export default Del;