import headerLogo from "../../assets/littlelogo.png"
import {
  StatusBar,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  Platform,
} from 'react-native';




const Header = () => {
    return (
        <View style={styles.style}>
        <Image
          source={headerLogo}
          style={{ width: 50, height: 50, marginLeft: 10, marginTop: '10%' }}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
   style : {
    backgroundColor: '#F3F3F3',
      height: 100,
      flexDirection: 'row',
       alignItems: 'center'
   }
  });
 
  
  export default Header;
