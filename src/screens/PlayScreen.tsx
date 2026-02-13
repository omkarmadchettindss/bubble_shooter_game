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
  
  // Calculate max insects based on level: Level 1 = 20, Level 2 = 25, Level 3 = 30, etc.
  const maxProgress = 15 + (levelNumber * 5);
  
  const [currentProgress, setCurrentProgress] = useState(0);
  const [shooterPosition, setShooterPosition] = useState({ x: 0, y: 0 });
  const [shouldFlyAway, setShouldFlyAway] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showInsects, setShowInsects] = useState(false);
  const [shootTrigger, setShootTrigger] = useState(0);
  const [currentWave, setCurrentWave] = useState(1);
  const [waveKey, setWaveKey] = useState(0); // Key to force re-render of InsectGame
  
  const progressPercentage = (currentProgress / maxProgress) * 100;
  
  // Wave system: Show 20 insects at a time
  const insectsPerWave = 20;
  const totalWaves = Math.ceil(maxProgress / insectsPerWave);
  const currentWaveInsects = Math.min(insectsPerWave, maxProgress - (currentWave - 1) * insectsPerWave);
  const previousWavesTotal = (currentWave - 1) * insectsPerWave;

  // Check if this is an insect level (levels 1-100)
  const isInsectLevel = levelNumber >= 1 && levelNumber <= 100;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleScoreChange = (newScore: number) => {
    const totalScore = previousWavesTotal + newScore;
    setCurrentProgress(totalScore);
    
    // Check if current wave is complete
    if (newScore >= currentWaveInsects) {
      // Check if there are more waves
      if (currentWave < totalWaves) {
        // Start next wave after a short delay
        setTimeout(() => {
          setCurrentWave(prev => prev + 1);
          setShowInsects(false);
          setWaveKey(prev => prev + 1); // Force re-render
          
          // Show new wave after brief pause
          setTimeout(() => {
            setShowInsects(true);
          }, 500);
        }, 1000);
      } else {
        // All waves complete - game over
        setShouldFlyAway(true);
      }
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
    // Navigate to next level
    const nextLevel = levelNumber + 1;
    setShowGameOver(false);
    setCurrentProgress(0);
    setShouldFlyAway(false);
    setShowInsects(false);
    setShootTrigger(0);
    setCurrentWave(1);
    setWaveKey(0);
    
    // Navigate to next level
    navigation.goBack();
    setTimeout(() => {
      (navigation.navigate as any)('Play', { levelNumber: nextLevel });
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
          {totalWaves > 1 && (
            <Text style={styles.waveText}>
              Wave {currentWave} / {totalWaves}
            </Text>
          )}
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
            {/* Insect Game for levels 1-100 */}
            <InsectGame 
              key={waveKey}
              onScoreChange={handleScoreChange} 
              maxScore={currentWaveInsects}
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
          onNext={handleReplay}
          onExit={handleExit}
        />
      </View>
    </ImageBackground>
  );
}
