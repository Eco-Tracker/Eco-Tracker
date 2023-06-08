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
import { FontAwesome } from '@expo/vector-icons';



const WrapperHeader = () => {
    return (
        <View style={styles.style}>
        <Image
          source={headerLogo}
          style={{ width: 50, height: 50, marginLeft: 10, marginTop: '15%' }}
        />
        <View style={{ backgroundColor: '#FFF', borderRadius: 5, marginTop: '15%', marginLeft: 30 ,flexDirection: 'row', alignItems: 'center',borderRadius:200}}>
          <FontAwesome name="search" size={20} style={{ padding: 10 }} color='#F3F3F3' />
          <TextInput
            style={{ width: 270, height: 20, paddingLeft: 10,fontSize: 20 }}
            placeholderTextColor="#000"
          />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
   style : {
    backgroundColor: '#F3F3F3',
      height: 120,
      flexDirection: 'row',
       alignItems: 'center'
   }
  });
 
  
  export default WrapperHeader;
