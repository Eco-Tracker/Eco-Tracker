import React from 'react';
import {View} from 'react-native';
import {colors, shadow} from './theme';
import Comment from './Comment';

const CommentButton = ({active, style}) => {
  return (
    <View
      style={[
        {
          backgroundColor: colors.white,
          padding: 4,
          borderRadius: 20,
          marginTop:15
          
        },
        shadow.light,
        style,
      ]}>
      <Comment icon={active ? 'FavoriteFilled' : 'Favorite'} size={24} />
    </View>
  );
};

export default CommentButton;