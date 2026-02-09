import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { IMAGE_URL } from '../constants/image';
import { COLORS } from '../constants/colors';
import { styles } from './styles/PlayScreen.styles';

export default function PlayScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const levelNumber = (route.params as any)?.levelNumber || 1;

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground source={{ uri: IMAGE_URL.BG }} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Back button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Image
            source={{ uri: IMAGE_URL.X_BUTTON }}
            style={styles.backButtonIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.gameContainer}>
          <Text style={styles.levelTitle}>Level {levelNumber}</Text>
          <Text style={styles.comingSoon}>Game Coming Soon...</Text>
          <Text style={styles.subtitle}>Bubble Shooter Gameplay</Text>
        </View>
      </View>
    </ImageBackground>
  );
}
