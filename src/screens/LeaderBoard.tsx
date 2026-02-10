import React from 'react';
import { View, Text, ImageBackground, FlatList, Image } from 'react-native';
import { IMAGE_URL } from '../constants/image';
import { styles } from './styles/LeaderBoard.styles';

// Mock data based on your image
const topPlayers = [
  { id: '2', name: 'NeonBlitz', avatar: '👩‍💼', coins: 500, rank: 2, color: '#9c59b66a' },
  { id: '1', name: 'ShadowPulse', avatar: '👦', coins: 600, rank: 1, color: '#3498db7c' },
  { id: '3', name: 'MysticFury', avatar: '👨', coins: 350, rank: 3, color: '#e67d225e' },
];

const leaderboardData = [
  { id: '1', rank: 4, name: 'ShadowPulse', score: 351323, coins: 600, avatar: '👦' },
  { id: '2', rank: 5, name: 'NeonBlitz', score: 248734, coins: 500, avatar: '👩‍💼' },
  { id: '3', rank: 6, name: 'MysticFury', score: 159382, coins: 350, avatar: '👨' },
  { id: '4', rank: 7, name: 'ThunderWrath', score: 154736, coins: 250, avatar: '👨‍🦰' },
  { id: '5', rank: 8, name: 'ArcticPhantom', score: 149583, coins: 150, avatar: '👨‍💼' },
  { id: '6', rank: 9, name: 'InfernoDrift', score: 139278, coins: 100, avatar: '👨‍🦱' },
  { id: '7', rank: 10, name: 'ShadowPulse', score: 351323, coins: 600, avatar: '👦' },
  { id: '8', rank: 11, name: 'NeonBlitz', score: 248734, coins: 500, avatar: '👩‍💼' },
  { id: '9', rank: 12, name: 'MysticFury', score: 159382, coins: 350, avatar: '👨' },
  { id: '10', rank: 13, name: 'ThunderWrath', score: 154736, coins: 250, avatar: '👨‍🦰' },
  { id: '11', rank: 14, name: 'ArcticPhantom', score: 149583, coins: 150, avatar: '👨‍💼' },
  { id: '12', rank: 16, name: 'InfernoDrift', score: 139278, coins: 100, avatar: '👨‍🦱' },
];

export default function LeaderBoard() {
  const renderTopPlayer = (player: typeof topPlayers[0], index: number) => {
    const isCenter = index === 1;
    const rankBadge = getRankBadge(player.rank);
    
    return (
      <View
        key={player.id}
        style={[
          styles.topPlayerCard,
          isCenter && styles.topPlayerCardCenter,
          { marginTop: isCenter ? 0 : 40 }
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
      </View>
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

  const renderLeaderboardItem = ({ item }: { item: typeof leaderboardData[0] }) => {
    return (
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
          <Text style={styles.coinText}>{item.coins}</Text>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground source={{ uri: IMAGE_URL.BG }} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Top 3 Players */}
        <View style={styles.topPlayersContainer}>
          {topPlayers.map((player, index) => renderTopPlayer(player, index))}
        </View>

        {/* Column Headers */}
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Rank</Text>
          <Text style={styles.headerText}>Name</Text>
          {/* <Text style={styles.headerText}>Score</Text> */}
          <Text style={styles.headerText}>Points</Text>
        </View>

        {/* Leaderboard List */}
        <FlatList
          data={leaderboardData}
          renderItem={renderLeaderboardItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />

        {/* Enter Tournament Button */}
        {/* <TouchableOpacity style={styles.enterButton}>
          <Text style={styles.enterButtonText}>Enter Tournament</Text>
          <Text style={styles.arrowIcon}>➤</Text>
        </TouchableOpacity> */}
      </View>
    </ImageBackground>
  );
}
