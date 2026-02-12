import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Animated, PanResponder } from 'react-native';
import { IMAGE_URL } from '../constants/image';

const { width, height } = Dimensions.get('window');

interface ShooterProps {
  onPositionChange: (position: { x: number; y: number }) => void;
  shouldFlyAway: boolean;
  onFlyAwayComplete: () => void;
  onIntroComplete?: () => void;
  onShoot?: () => void;
}

export default function Shooter({ onPositionChange, shouldFlyAway, onFlyAwayComplete, onIntroComplete, onShoot }: ShooterProps) {
  const translateY = useRef(new Animated.Value(-height * 0.25)).current; // Start from center
  const translateX = useRef(new Animated.Value(width / 2 - 75)).current; // Start centered (75 is half spaceship width)
  const [hasIntroPlayed, setHasIntroPlayed] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const shootIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentPositionRef = useRef({ x: width / 2, y: height * 0.875 });
  const isGameActiveRef = useRef(false);

  // Update ref when state changes
  useEffect(() => {
    isGameActiveRef.current = isGameActive;
  }, [isGameActive]);

  // Pan responder for dragging the spaceship
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        console.log('onStartShouldSetPanResponder, isGameActive:', isGameActiveRef.current);
        return true; // Always return true to capture the gesture
      },
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log('Pan gesture started, isGameActive:', isGameActiveRef.current);
      },
      onPanResponderMove: (_, gestureState) => {
        if (!isGameActiveRef.current) {
          console.log('Ignoring pan - game not active');
          return;
        }
        
        console.log('Pan move:', gestureState.moveX);
        
        // Calculate new X position (centered on touch)
        const newX = gestureState.moveX - 75; // 75 is half of spaceship width
        
        // Constrain to screen bounds
        const minX = 0;
        const maxX = width - 150; // 150 is spaceship width
        const constrainedX = Math.max(minX, Math.min(maxX, newX));
        
        translateX.setValue(constrainedX);
        
        // Update current position (center of spaceship)
        currentPositionRef.current.x = constrainedX + 75;
        onPositionChange(currentPositionRef.current);
      },
    })
  ).current;

  useEffect(() => {
    // Start intro animation after 1 second
    const timer = setTimeout(() => {
      // Animate spaceship from center to bottom
      Animated.timing(translateY, {
        toValue: 0, // Move to final position
        duration: 1000,
        useNativeDriver: false, // Set to false to allow JS-based animations
      }).start(() => {
        setHasIntroPlayed(true);
        setIsGameActive(true);
        
        // Calculate final shooter position
        const shooterX = width / 2;
        const shooterY = height * 0.875; // Adjusted for better positioning
        currentPositionRef.current = { x: shooterX, y: shooterY };
        onPositionChange(currentPositionRef.current);
        
        // Notify that intro is complete
        if (onIntroComplete) {
          onIntroComplete();
        }
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-shoot continuously
  useEffect(() => {
    console.log('Shoot effect triggered:', { isGameActive, shouldFlyAway, hasOnShoot: !!onShoot });
    if (isGameActive && !shouldFlyAway && onShoot) {
      console.log('Starting auto-shoot interval');
      shootIntervalRef.current = setInterval(() => {
        console.log('Shooting!');
        onShoot();
      }, 150); // Shoot every 150ms (increased frequency)

      return () => {
        console.log('Clearing shoot interval');
        if (shootIntervalRef.current) {
          clearInterval(shootIntervalRef.current);
        }
      };
    } else {
      // Clear interval if conditions are not met
      if (shootIntervalRef.current) {
        clearInterval(shootIntervalRef.current);
        shootIntervalRef.current = null;
      }
    }
  }, [isGameActive, shouldFlyAway]);

  useEffect(() => {
    if (shouldFlyAway && hasIntroPlayed) {
      setIsGameActive(false);
      if (shootIntervalRef.current) {
        clearInterval(shootIntervalRef.current);
      }
      
      // Animate spaceship flying upward out of screen
      Animated.timing(translateY, {
        toValue: -height,
        duration: 500,
        useNativeDriver: false, // Set to false to allow JS-based animations
      }).start(() => {
        onFlyAwayComplete();
      });
    }
  }, [shouldFlyAway, hasIntroPlayed]);

  return (
    <View style={styles.shooterArea} {...panResponder.panHandlers}>
      <Animated.View 
        style={[
          styles.shooterContainer,
          {
            transform: [
              { translateX },
              { translateY },
            ],
          },
        ]}
      >
        <Image
          source={{ uri: IMAGE_URL.SPACESHIP }}
          style={styles.shooterImage}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  shooterArea: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    height: height * 0.25,
    zIndex: 1000, // Ensure it's on top
  },
  shooterContainer: {
    position: 'absolute',
    width: 150,
    height: 180,
  },
  shooterImage: {
    width: 150,
    height: 180,
  },
});