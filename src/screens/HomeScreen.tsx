import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, Animated } from 'react-native';
import { ArrowUpRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { IMAGE_URL } from '../constants/image';
import { COLORS } from '../constants/colors';
import { styles } from './styles/HomeScreen.styles';
import SettingsModal from '../components/SettingsModal';
import InfoModal from '../components/InfoModal';

interface HomeScreenProps {
  userWallet: string;
}

export default function HomeScreen({ userWallet }: HomeScreenProps) {
  const coinCount = 1250;
  const navigation = useNavigation();
  // Animation for notification shake
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  // Animation for daily reward box
  const dailyRewardAnimation = useRef(new Animated.Value(1)).current;
  // Animation for daily challenge
  const dailyChallengeAnimation = useRef(new Animated.Value(1)).current;
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    // Start continuous shake animation for notification
    const shake = Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 1,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -1,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 1,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -1,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.delay(1500), // Pause for 1.5 seconds before next shake
      ])
    );
    shake.start();

    // Start continuous ease-in ease-out animation for daily reward box
    const dailyRewardPulse = Animated.loop(
      Animated.sequence([
        Animated.timing(dailyRewardAnimation, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(dailyRewardAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    dailyRewardPulse.start();

    // Start continuous ease-in ease-out animation for daily challenge
    const dailyChallengePulse = Animated.loop(
      Animated.sequence([
        Animated.timing(dailyChallengeAnimation, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(dailyChallengeAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    dailyChallengePulse.start();

    return () => {
      shake.stop();
      dailyRewardPulse.stop();
      dailyChallengePulse.stop();
    };
  }, []);

  const shakeTransform = shakeAnimation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-8deg', '0deg', '8deg'],
  });

  const handleSettingsPress = () => {
    setShowSettingsModal(true);
  };

  const handlePlayPress = () => {
    navigation.navigate('Level' as never);
  };

  const handleInfoPress = () => {
    setShowInfoModal(true);
  };

  const handleDailyRewardPress = () => {
    navigation.navigate('DailyReward' as never);
  };
  return (
    <ImageBackground source={{ uri: IMAGE_URL.BG }} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Email Display at Top Left */}
        {/* <View style={styles.walletContainer}>
          <View style={styles.emailRow}>
            <User size={20} color={COLORS.primary} style={styles.userIcon} />
            <Text style={styles.walletAddressTopLeft}>{userWallet.split('@')[0]}</Text>
          </View>
        </View> */}

        {/* Coin Container - Below Email */}
        <View style={styles.coinContainer}>
          <TouchableOpacity style={styles.coinButton}>
            <Image
              source={{ uri: IMAGE_URL.COIN_CONTAINER }}
              style={styles.coinImage}
              resizeMode="contain"
            />
            <Text style={styles.coinText}>{coinCount}</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Reward Box - Below Coin Container */}
        <View style={styles.dailyRewardContainer}>
          <TouchableOpacity style={styles.dailyRewardButton} onPress={handleDailyRewardPress}>
            <Animated.Image
              source={{ uri: IMAGE_URL.DAILY_REWARD_BOX }}
              style={[
                styles.dailyRewardImage,
                {
                  transform: [{ scale: dailyRewardAnimation }]
                }
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <TouchableOpacity style={styles.infoButton} onPress={handleInfoPress}>
            <Image
              source={{ uri: IMAGE_URL.INFO_BUTTON }}
              style={[
                styles.infoIcon
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {/* Settings Icon at Top Right */}
        <View style={styles.notificationContainer}>
          <TouchableOpacity style={styles.notificationButton} onPress={handleSettingsPress}>
            <Image
              source={{ uri: IMAGE_URL.SETTING_BUTTON }}
              style={styles.notificationIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Daily Challenge - Below Notification and Info */}
        <View style={styles.dailyChallengeContainer}>
          <TouchableOpacity style={styles.dailyChallengeButton}>
            <Animated.Image
              source={{ uri: IMAGE_URL.DAILY_CHALLENGE }}
              style={[
                styles.dailyChallengeImage,
                {
                  transform: [{ scale: dailyChallengeAnimation }]
                }
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>


        {/* Promo Banner - Above Play Button */}
        <View style={styles.promoBannerContainer}>
          <View style={styles.promoBannerFrame}>
            <TouchableOpacity 
              style={styles.promoBannerButton}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: IMAGE_URL.PROMO_BANNER }}
                style={styles.promoBannerImage}
                resizeMode="cover"
              />
              {/* Arrow badge pointing 45deg upwards */}
              <View style={styles.promoBadge}>
                <ArrowUpRight size={16} color={COLORS.white} strokeWidth={3} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Play Button */}
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
          <Image
            style={styles.playButtonImage}
            source={{ uri: IMAGE_URL.PLAY_BUTTON }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Settings Modal */}
        <SettingsModal
          visible={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
        />

        {/* Info Modal */}
        <InfoModal
          visible={showInfoModal}
          onClose={() => setShowInfoModal(false)}
        />
      </View>
    </ImageBackground>
  );
}
