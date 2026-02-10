import React, { useRef, useCallback } from 'react';
import { View, Text, ImageBackground, FlatList, Image, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { IMAGE_URL } from '../constants/image';
import { styles } from './styles/LeaderBoard.styles';

// Mock data based on your image
const topPlayers = [
  { id: '2', name: 'Omkar C', avatar: '👩‍💼', coins: 500, rank: 2, color: '#9c59b66a' },
  { id: '1', name: 'Omkar', avatar: '👦', coins: 600, rank: 1, color: '#3498db7c' },
  { id: '3', name: 'Pranav', avatar: '👨', coins: 350, rank: 3, color: '#e67d225e' },
];

const leaderboardData = [
  { id: '1', rank: 4, name: 'Yash', score: 351323, coins: 600, avatar: '👦' },
  { id: '2', rank: 5, name: 'Shubham', score: 248734, coins: 500, avatar: '👩‍💼' },
  { id: '3', rank: 6, name: 'Abhijeet', score: 159382, coins: 350, avatar: '👨' },
  { id: '4', rank: 7, name: 'Akash', score: 154736, coins: 250, avatar: '👨‍🦰' },
  { id: '5', rank: 8, name: 'Darshan', score: 149583, coins: 150, avatar: '👨‍💼' },
  { id: '6', rank: 9, name: 'Purnav', score: 139278, coins: 100, avatar: '👨‍🦱' },
  { id: '7', rank: 10, name: 'Swapnil', score: 351323, coins: 600, avatar: '👦' },
  { id: '8', rank: 11, name: 'Sarthak', score: 248734, coins: 500, avatar: '👩‍💼' },
  { id: '9', rank: 12, name: 'Abhinav', score: 159382, coins: 350, avatar: '👨' },
  { id: '10', rank: 13, name: 'Aditya', score: 154736, coins: 250, avatar: '👨‍🦰' },
  { id: '11', rank: 14, name: 'Soham', score: 149583, coins: 150, avatar: '👨‍💼' },
  { id: '12', rank: 16, name: 'Sahil', score: 139278, coins: 100, avatar: '👨‍🦱' },
];

export default function LeaderBoard() {
  // Animation values for top 3 players (bouncing)
  const bounceAnim1 = useRef(new Animated.Value(0)).current;
  const bounceAnim2 = useRef(new Animated.Value(0)).current;
  const bounceAnim3 = useRef(new Animated.Value(0)).current;
  
  // Animation value for the entire leaderboard frame (slide up from bottom)
  const frameSlideUpAnim = useRef(new Animated.Value(200)).current;
  
  // Create separate animation values for each row
  const rowAnimations = useRef(
    leaderboardData.map(() => new Animated.Value(100))
  ).current;

  // Use useFocusEffect to trigger animations every time screen comes into focus
  useFocusEffect(
    useCallback(() => {
      // Continuous smooth bouncing animation for top 3 players
      const createBounceAnimation = (animValue: Animated.Value, delay: number) => {
        // Reset to initial position
        animValue.setValue(0);
        
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(animValue, {
              toValue: -12,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(animValue, {
              toValue: 0,
              duration: 800,
              useNativeDriver: true,
            }),
          ])
        );
      };

      // Start bouncing animations with staggered delays
      const bounce1 = createBounceAnimation(bounceAnim1, 0);
      const bounce2 = createBounceAnimation(bounceAnim2, 200);
      const bounce3 = createBounceAnimation(bounceAnim3, 400);

      bounce1.start();
      bounce2.start();
      bounce3.start();

      // Reset and start slide up animation for the leaderboard frame (rank 4+)
      frameSlideUpAnim.setValue(200);
      Animated.spring(frameSlideUpAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        delay: 200,
        useNativeDriver: true,
      }).start();

      // Reset and start staggered slide up animation for each row
      rowAnimations.forEach(anim => anim.setValue(100));
      
      const rowAnimationSequence = rowAnimations.map((anim, index) => {
        return Animated.timing(anim, {
          toValue: 0,
          duration: 400,
          delay: 500 + (index * 80), // Each row starts 80ms after the previous
          useNativeDriver: true,
        });
      });

      // Start all row animations
      Animated.parallel(rowAnimationSequence).start();

      // Cleanup function - stop all animations when screen loses focus
      return () => {
        bounce1.stop();
        bounce2.stop();
        bounce3.stop();
        // Stop frame and row animations
        frameSlideUpAnim.stopAnimation();
        rowAnimations.forEach(anim => anim.stopAnimation());
      };
    }, [bounceAnim1, bounceAnim2, bounceAnim3, frameSlideUpAnim, rowAnimations])
  );

  const renderTopPlayer = (player: typeof topPlayers[0], index: number) => {
    const isCenter = index === 1;
    const rankBadge = getRankBadge(player.rank);
    
    // Select the appropriate bounce animation based on index
    const bounceAnim = index === 0 ? bounceAnim1 : index === 1 ? bounceAnim2 : bounceAnim3;
    
    return (
      <Animated.View
        key={player.id}
        style={[
          styles.topPlayerCard,
          isCenter && styles.topPlayerCardCenter,
          { 
            marginTop: isCenter ? 0 : 40,
            transform: [{ translateY: bounceAnim }]
          }
        ]}
      >
        <View style={[styles.avatarContainer, { backgroundColor: player.color }]}>
          {rankBadge && (
            <Image 
              source={{ uri: rankBadge }} 
              style={styles.topRankBadge}
              resizeMode="contain"
            />
          )}
        </View>
        <Text style={styles.topPlayerName}>{player.name}</Text>
        <View style={styles.coinBadge}>
          <Text style={styles.coinIcon}>🪙</Text>
          <Text style={styles.coinAmount}>{player.coins}</Text>
        </View>
      </Animated.View>
    );
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return IMAGE_URL.RANK1;
      case 2:
        return IMAGE_URL.RANK2;
      case 3:
        return IMAGE_URL.RANK3;
      default:
        return null;
    }
  };

  const renderLeaderboardItem = ({ item, index }: { item: typeof leaderboardData[0], index: number }) => {
    return (
      <Animated.View
        style={{
          transform: [{ translateY: rowAnimations[index] }],
          opacity: rowAnimations[index].interpolate({
            inputRange: [0, 100],
            outputRange: [1, 0],
          }),
        }}
      >
        <ImageBackground 
          source={{ uri: IMAGE_URL.RANK_ROW_BG }}
          style={styles.leaderboardRowBg}
          resizeMode="stretch"
        >
          <View style={styles.leaderboardRow}>
            <View style={styles.tableCell}>
              <Text style={[
                styles.rankText,
                item.rank <= 3 && styles.rankTextTop
              ]}>
                {`#${item.rank}`}
              </Text>
            </View>

            <View style={styles.tableCell}>
              <Text style={styles.playerName}>{item.name}</Text>
            </View>

            <View style={styles.tableCell}>
              <Text style={styles.bottomCoinIcon}>🪙</Text>
              <Text style={styles.coinText}>{item.coins}</Text>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    );
  };

  return (
    <ImageBackground source={{ uri: IMAGE_URL.BG }} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Top 3 Players */}
        <View style={styles.topPlayersContainer}>
          {topPlayers.map((player, index) => renderTopPlayer(player, index))}
        </View>

        {/* Leaderboard Frame with Rankings 4+ - Animated */}
        <Animated.View
          style={{
            transform: [{ translateY: frameSlideUpAnim }],
            opacity: frameSlideUpAnim.interpolate({
              inputRange: [0, 200],
              outputRange: [1, 0],
            }),
          }}
        >
          <ImageBackground 
            source={{ uri: IMAGE_URL.LEADERBOARD_FRAME_BG }}
            style={styles.leaderboardFrame}
            resizeMode="stretch"
          >
            {/* Column Headers */}
            <View style={styles.headerRow}>
              <Text style={styles.headerTextRank}>Rank</Text>
              <Text style={styles.headerTextName}>Name</Text>
              <Text style={styles.headerTextPoints}>Points</Text>
            </View>

            {/* Leaderboard List */}
            <FlatList
              data={leaderboardData}
              renderItem={renderLeaderboardItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              style={styles.scrollableList}
              contentContainerStyle={styles.listContainer}
            />
          </ImageBackground>
        </Animated.View>

        {/* Enter Tournament Button */}
        {/* <TouchableOpacity style={styles.enterButton}>
          <Text style={styles.enterButtonText}>Enter Tournament</Text>
          <Text style={styles.arrowIcon}>➤</Text>
        </TouchableOpacity> */}
      </View>
    </ImageBackground>
  );
}
