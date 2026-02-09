import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'rgba(11, 11, 11, 0.7)', // Semi-transparent overlay
  },
  text: { 
    fontSize: RFValue(24), 
    fontWeight: 'bold',
    color: '#fff',
  },
});