import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IMAGE_URL, getLevelBackground } from '../constants/image';
import { styles } from './styles/PlayScreen.styles';
import InsectGame from '../components/InsectGame';
import Shooter from '../components/Shooter';
import GameOverModal from '../components/GameOverModal';

export default function PlayScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const levelNumber = (route.params as any)?.levelNumber || 1;
  const levelBg = getLevelBackground(levelNumber);
  
  const [currentProgress, setCurrentProgress] = useState(0);
  const [shooterPosition, setShooterPosition] = useState({ x: 0, y: 0 });
  const [shouldFlyAway, setShouldFlyAway] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showInsects, setShowInsects] = useState(false);
  const [shootTrigger, setShootTrigger] = useState(0);
  const maxProgress = 20;
  const progressPercentage = (currentProgress / maxProgress) * 100;

  // Check if this is an insect level (levels 1-5)
  const isInsectLevel = levelNumber >= 1 && levelNumber <= 5;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleScoreChange = (newScore: number) => {
    setCurrentProgress(newScore);
    
    // Check if game is complete
    if (newScore >= maxProgress) {
      setShouldFlyAway(true);
    }
  };

  const handleShooterPositionChange = (position: { x: number; y: number }) => {
    setShooterPosition(position);
  };

  const handleIntroComplete = () => {
    // Show insects after spaceship is in position
    setShowInsects(true);
  };

  const handleShoot = () => {
    // Trigger a shoot by incrementing counter
    setShootTrigger(prev => prev + 1);
  };

  const handleShootComplete = () => {
    // No need to reset anything with counter approach
  };

  const handleFlyAwayComplete = () => {
    setShowGameOver(true);
  };

  const handleReplay = () => {
    setShowGameOver(false);
    setCurrentProgress(0);
    setShouldFlyAway(false);
    setShowInsects(false);
    setShootTrigger(0);
    // Force re-render by navigating back and forth
    navigation.goBack();
    setTimeout(() => {
      (navigation.navigate as any)('Play', { levelNumber });
    }, 100);
  };

  const handleExit = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground source={{ uri: levelBg }} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {currentProgress} / {maxProgress}
          </Text>
        </View>

        {/* Back button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Image
            source={{ uri: IMAGE_URL.X_BUTTON }}
            style={styles.backButtonIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Game Content */}
        {isInsectLevel ? (
          <>
            {/* Insect Game for levels 1-5 */}
            <InsectGame 
              onScoreChange={handleScoreChange} 
              maxScore={maxProgress}
              shooterPosition={shooterPosition}
              showInsects={showInsects}
              shootTrigger={shootTrigger}
              onShootComplete={handleShootComplete}
            />
            <Shooter 
              onPositionChange={handleShooterPositionChange}
              shouldFlyAway={shouldFlyAway}
              onFlyAwayComplete={handleFlyAwayComplete}
              onIntroComplete={handleIntroComplete}
              onShoot={handleShoot}
            />
          </>
        ) : (
          <View style={styles.gameContainer}>
            <Text style={styles.levelTitle}>Level {levelNumber}</Text>
            <Text style={styles.comingSoon}>Game Coming Soon...</Text>
            <Text style={styles.subtitle}>Bubble Shooter Gameplay</Text>
          </View>
        )}

        {/* Game Over Modal */}
        <GameOverModal
          visible={showGameOver}
          score={currentProgress}
          maxScore={maxProgress}
          onReplay={handleReplay}
          onExit={handleExit}
        />
      </View>
    </ImageBackground>
  );
}
