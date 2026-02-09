import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { IMAGE_URL } from '../constants/image';
import { styles } from './styles/LeaderBoard.styles';

export default function LeaderBoard() {
  return (
    <ImageBackground source={{ uri: IMAGE_URL.BG }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.text}>LeaderBoard</Text>
      </View>
    </ImageBackground>
  );
}
