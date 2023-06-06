import React from 'react';
import { StyleSheet, View ,Text,button} from 'react-native';


const ProfileScreen = ({Navigation}) => {
  return (
    <View style={styles.container}>
     <Text>ProfileScreen</Text>
     <button
     title='Click here'
     onPaste={()=>alert("button clicked")}/>

    </View>
  );
}
export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8fcbbc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


