import React from 'react';
import {View} from 'react-native';
import {colors, shadow} from './theme';
import Del from './del';

const DeleteButton = ({active, style}) => {
  return (
    <View
      style={[
        {
          backgroundColor: colors.white,
          padding: 4,
          borderRadius: 20,
        },
        shadow.light,
        style,
      ]}>
      <Del icon={active ? 'FavoriteFilled' : 'Favorite' } size={24} />
    </View>
  );
};

export default DeleteButton;
