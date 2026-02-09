import React, { useEffect, useRef, useState } from 'react';
import { View, ImageBackground, Image, TouchableOpacity, Text, Animated, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IMAGE_URL } from '../constants/image';
import { styles } from './styles/DailyRewardScreen.styles';
import CustomAlert from '../components/CustomAlert';

export default function DailyRewardScreen() {
  const navigation = useNavigation();

  // Animation values for each reward
  const rewardAnimations = useRef([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
  ]).current;

  // Alert state
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'locked'>('success');

  useEffect(() => {
    // Start continuous pulse animations only for enabled rewards
    rewardAnimations.forEach((animation, index) => {
      if (rewards[index].enabled) {
        const pulseAnimation = Animated.loop(
          Animated.sequence([
            Animated.timing(animation, {
              toValue: 1.01,
              duration: 1000 + (index * 200), // Different duration for each
              useNativeDriver: true,
            }),
            Animated.timing(animation, {
              toValue: 1,
              duration: 1000 + (index * 200),
              useNativeDriver: true,
            }),
          ])
        );

        // Start each animation with a delay
        setTimeout(() => {
          pulseAnimation.start();
        }, index * 300);
      }
    });

    return () => {
      rewardAnimations.forEach(animation => animation.stopAnimation());
    };
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleRewardPress = (rewardType: string, index: number) => {
    // Only allow interaction with enabled rewards
    if (!rewards[index].enabled) {
      setAlertTitle('Reward Locked');
      setAlertMessage(`${rewardType} reward is not available yet. Complete previous days first!`);
      setAlertType('locked');
      setAlertVisible(true);
      return;
    }

    // Scale animation on press
    Animated.sequence([
      Animated.timing(rewardAnimations[index], {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(rewardAnimations[index], {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setAlertTitle('Reward Claimed!');
    setAlertMessage(`You claimed the ${rewardType} reward!`);
    setAlertType('success');
    setAlertVisible(true);
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  const rewards = [
    { id: 'day1', name: 'Day 1', image: IMAGE_URL.DAY1, day: 'Day 1', enabled: true },
    { id: 'day2', name: 'Day 2', image: IMAGE_URL.DAY2, day: 'Day 2', enabled: false },
    { id: 'day3', name: 'Day 3', image: IMAGE_URL.DAY3, day: 'Day 3', enabled: false },
    { id: 'day4', name: 'Day 4', image: IMAGE_URL.DAY4, day: 'Day 4', enabled: false },
    { id: 'day5', name: 'Day 5', image: IMAGE_URL.DAY5, day: 'Day 5', enabled: false },
    { id: 'day6', name: 'Day 6', image: IMAGE_URL.DAY6, day: 'Day 6', enabled: false },
    { id: 'day7', name: 'Day 7', image: IMAGE_URL.DAY7, day: 'Day 7', enabled: false },
  ];

  return (
    <ImageBackground source={{ uri: IMAGE_URL.BG }} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Daily Reward Tag at the top */}
        <View style={styles.dailyRewardTagContainer}>
          <Image
            source={{ uri: IMAGE_URL.DAILY_REWARD_TAG }}
            style={styles.dailyRewardTag}
            resizeMode="contain"
          />
        </View>

        {/* Back button or close button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <View style={styles.backButtonCircle}>
            <Image
              source={{ uri: IMAGE_URL.X_BUTTON }}
              style={styles.backButtonIcon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>

        {/* Daily reward content area */}
        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>
            {/* Rewards Grid */}
            <View style={styles.rewardsGrid}>
            {/* First Row */}
            <View style={styles.rewardRow}>
              <TouchableOpacity
                style={[styles.rewardItem, !rewards[0].enabled && styles.disabledRewardItem]}
                onPress={() => handleRewardPress(rewards[0].name, 0)}
              >
                <Animated.Image
                  source={{ uri: rewards[0].image }}
                  style={[
                    styles.rewardImage,
                    !rewards[0].enabled && styles.disabledRewardImage,
                    {
                      transform: [{ scale: rewardAnimations[0] }]
                    }
                  ]}
                  resizeMode="contain"
                />
                <Text style={[styles.dayText, !rewards[0].enabled && styles.disabledDayText]}>{rewards[0].day}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.rewardItem, !rewards[1].enabled && styles.disabledRewardItem]}
                onPress={() => handleRewardPress(rewards[1].name, 1)}
              >
                <Animated.Image
                  source={{ uri: rewards[1].image }}
                  style={[
                    styles.rewardImage,
                    !rewards[1].enabled && styles.disabledRewardImage,
                    {
                      transform: [{ scale: rewardAnimations[1] }]
                    }
                  ]}
                  resizeMode="contain"
                />
                <Text style={[styles.dayText, !rewards[1].enabled && styles.disabledDayText]}>{rewards[1].day}</Text>
              </TouchableOpacity>
            </View>

            {/* Second Row */}
            <View style={styles.rewardRow}>
              <TouchableOpacity
                style={[styles.rewardItem, !rewards[2].enabled && styles.disabledRewardItem]}
                onPress={() => handleRewardPress(rewards[2].name, 2)}
              >
                <Animated.Image
                  source={{ uri: rewards[2].image }}
                  style={[
                    styles.rewardImage,
                    !rewards[2].enabled && styles.disabledRewardImage,
                    {
                      transform: [{ scale: rewardAnimations[2] }]
                    }
                  ]}
                  resizeMode="contain"
                />
                <Text style={[styles.dayText, !rewards[2].enabled && styles.disabledDayText]}>{rewards[2].day}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.rewardItem, !rewards[3].enabled && styles.disabledRewardItem]}
                onPress={() => handleRewardPress(rewards[3].name, 3)}
              >
                <Animated.Image
                  source={{ uri: rewards[3].image }}
                  style={[
                    styles.rewardImage,
                    !rewards[3].enabled && styles.disabledRewardImage,
                    {
                      transform: [{ scale: rewardAnimations[3] }]
                    }
                  ]}
                  resizeMode="contain"
                />
                <Text style={[styles.dayText, !rewards[3].enabled && styles.disabledDayText]}>{rewards[3].day}</Text>
              </TouchableOpacity>
            </View>

            {/* Third Row */}
            <View style={styles.rewardRow}>
              <TouchableOpacity
                style={[styles.rewardItem, !rewards[4].enabled && styles.disabledRewardItem]}
                onPress={() => handleRewardPress(rewards[4].name, 4)}
              >
                <Animated.Image
                  source={{ uri: rewards[4].image }}
                  style={[
                    styles.rewardImage,
                    !rewards[4].enabled && styles.disabledRewardImage,
                    {
                      transform: [{ scale: rewardAnimations[4] }]
                    }
                  ]}
                  resizeMode="contain"
                />
                <Text style={[styles.day5Text, !rewards[4].enabled && styles.disabledDayText]}>{rewards[4].day}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.rewardItem, !rewards[5].enabled && styles.disabledRewardItem]}
                onPress={() => handleRewardPress(rewards[5].name, 5)}
              >
                <Animated.Image
                  source={{ uri: rewards[5].image }}
                  style={[
                    styles.rewardImage,
                    !rewards[5].enabled && styles.disabledRewardImage,
                    {
                      transform: [{ scale: rewardAnimations[5] }]
                    }
                  ]}
                  resizeMode="contain"
                />
                <Text style={[styles.day6Text, !rewards[5].enabled && styles.disabledDayText]}>{rewards[5].day}</Text>
              </TouchableOpacity>
            </View>

            {/* Fourth Row */}
            <View style={styles.rewardRow}>
              <TouchableOpacity
                style={[styles.day7RewardItem, !rewards[6].enabled && styles.disabledRewardItem]}
                onPress={() => handleRewardPress(rewards[6].name, 6)}
              >
                <Animated.Image
                  source={{ uri: rewards[6].image }}
                  style={[
                    styles.day7RewardImage,
                    !rewards[6].enabled && styles.disabledRewardImage,
                    {
                      transform: [{ scale: rewardAnimations[6] }]
                    }
                  ]}
                  resizeMode="contain"
                />
                <Text style={[styles.day7Text, !rewards[6].enabled && styles.disabledDayText]}>{rewards[6].day}</Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>
        </ScrollView>

        {/* Custom Alert */}
        <CustomAlert
          visible={alertVisible}
          title={alertTitle}
          message={alertMessage}
          buttons={[
            {
              text: 'OK',
              style: 'default',
              onPress: handleCloseAlert,
            },
          ]}
          onClose={handleCloseAlert}
        />
      </View>
    </ImageBackground>
  );
}