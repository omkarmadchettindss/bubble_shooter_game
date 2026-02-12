import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, Image } from 'react-native';
import { IMAGE_URL } from '../constants/image';

const { width, height } = Dimensions.get('window');

interface Insect {
  id: number;
  x: Animated.Value;
  y: Animated.Value;
  scale: Animated.Value;
  rotation: Animated.Value;
  type: keyof typeof IMAGE_URL.INSECTS;
  isAlive: boolean;
}

interface Projectile {
  id: number;
  x: Animated.Value;
  y: Animated.Value;
  startX: number;
  startY: number;
}

interface InsectGameProps {
  onScoreChange: (score: number) => void;
  maxScore: number;
  shooterPosition: { x: number; y: number };
  showInsects?: boolean;
  shootTrigger?: number;
  onShootComplete?: () => void;
}

export default function InsectGame({ 
  onScoreChange, 
  maxScore, 
  shooterPosition, 
  showInsects = false,
  shootTrigger = 0,
  onShootComplete
}: InsectGameProps) {
  const insectsRef = useRef<Insect[]>([]);
  const [insects, setInsects] = useState<Insect[]>([]);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [score, setScore] = useState(0);
  const projectileIdCounter = useRef(0);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const gameAreaHeight = height * 0.75;

  useEffect(() => {
    if (!showInsects) return;

    // Create 20 insects (4 rows x 5 columns)
    const insectTypes = Object.keys(IMAGE_URL.INSECTS) as Array<keyof typeof IMAGE_URL.INSECTS>;
    const rows = 4;
    const cols = 5;
    const insectSpacing = 85; // Increased spacing between insects
    const startX = (width - (cols - 1) * insectSpacing) / 2;
    const startY = 80;

    const newInsects: Insect[] = Array.from({ length: maxScore }, (_, i) => {
      const randomType = insectTypes[Math.floor(Math.random() * insectTypes.length)];
      const row = Math.floor(i / cols);
      const col = i % cols;
      
      // Calculate final grid position
      const finalX = startX + col * insectSpacing;
      const finalY = startY + row * insectSpacing;
      
      // Start position: alternate from left and right sides
      const startFromLeft = i % 2 === 0;
      const initialX = startFromLeft ? -100 : width + 100;
      const initialY = finalY;
      
      return {
        id: i,
        x: new Animated.Value(initialX),
        y: new Animated.Value(initialY),
        scale: new Animated.Value(0.8 + Math.random() * 0.4),
        rotation: new Animated.Value(0),
        type: randomType,
        isAlive: true,
      };
    });

    insectsRef.current = newInsects;
    setInsects(newInsects);

    // Start intro animation sequence
    startIntroAnimation(newInsects, startX, startY, rows, cols, insectSpacing);

    return () => {
      insectsRef.current.forEach((insect) => {
        insect.x.stopAnimation();
        insect.y.stopAnimation();
        insect.rotation.stopAnimation();
      });
    };
  }, [showInsects]);

  const startIntroAnimation = (
    insects: Insect[], 
    startX: number, 
    startY: number, 
    _rows: number, 
    cols: number, 
    _spacing: number
  ) => {
    // Phase 1: Insects fly in from sides (5 seconds)
    insects.forEach((insect, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const finalX = startX + col * 85; // Increased spacing
      const finalY = startY + row * 85; // Increased spacing
      
      // Stagger the animation slightly for each insect
      const delay = i * 100;
      
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(insect.x, {
            toValue: finalX,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(insect.rotation, {
            toValue: 360,
            duration: 1500,
            useNativeDriver: false,
          }),
        ]).start(() => {
          // After 5 seconds total, check if this is the last insect
          if (i === insects.length - 1) {
            setTimeout(() => {
              setIsIntroComplete(true);
              // Start continuous movement for all insects
              insects.forEach(insect => animateInsect(insect));
            }, 3500 - delay); // Adjust to make total 5 seconds
          }
        });
      }, delay);
    });
  };

  const animateInsect = (insect: Insect) => {
    if (!insect.isAlive) return;

    const duration = 2000 + Math.random() * 2000;
    const newX = Math.random() * (width - 100) + 50;
    const newY = Math.random() * (gameAreaHeight - 150) + 50;
    const newRotation = (insect.rotation as any)._value + (Math.random() * 180 - 90);

    Animated.parallel([
      Animated.timing(insect.x, {
        toValue: newX,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(insect.y, {
        toValue: newY,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(insect.rotation, {
        toValue: newRotation,
        duration: duration,
        useNativeDriver: false,
      }),
    ]).start(() => {
      if (insect.isAlive) {
        animateInsect(insect);
      }
    });
  };

  // Handle auto-shooting - shoot straight up
  useEffect(() => {
    console.log('Shoot trigger changed:', { shootTrigger, isIntroComplete });
    if (shootTrigger > 0 && isIntroComplete) {
      console.log('Shooting from position:', shooterPosition);
      shootStraightUp();
    }
  }, [shootTrigger, isIntroComplete]);

  const shootStraightUp = () => {
    // Shoot projectile straight up from current shooter position
    const projectileId = projectileIdCounter.current++;
    
    // Store the current shooter position at the time of shooting
    const startX = shooterPosition.x;
    const startY = shooterPosition.y;
    
    const newProjectile: Projectile = {
      id: projectileId,
      x: new Animated.Value(startX),
      y: new Animated.Value(startY),
      startX: startX,
      startY: startY,
    };

    setProjectiles((prev) => [...prev, newProjectile]);

    const speed = 1000; // pixels per second
    const distance = startY + 100; // Distance to top of screen
    const duration = (distance / speed) * 1000;

    console.log('Projectile created:', { id: projectileId, startX, startY, duration });

    // Animate projectile straight up
    Animated.timing(newProjectile.y, {
      toValue: -100,
      duration: duration,
      useNativeDriver: false,
    }).start(() => {
      // Remove projectile after reaching top
      console.log('Projectile reached top:', projectileId);
      setProjectiles((prev) => prev.filter((p) => p.id !== projectileId));
    });

    // Check for collisions during flight
    checkCollisionsDuringFlight(newProjectile, duration, startX);
  };

  const checkCollisionsDuringFlight = (projectile: Projectile, duration: number, bulletX: number) => {
    // Check for collisions every 30ms during flight
    const checkInterval = 30;
    const checks = Math.floor(duration / checkInterval);
    
    let hasHit = false;
    
    for (let i = 0; i < checks; i++) {
      setTimeout(() => {
        if (hasHit) return; // Stop checking if already hit something
        
        const currentY = (projectile.y as any)._value;
        
        // Check if projectile hits any insect
        insectsRef.current.forEach((insect) => {
          if (!insect.isAlive || hasHit) return;
          
          const insectX = (insect.x as any)._value;
          const insectY = (insect.y as any)._value;
          
          // Insect dimensions (80x80 based on styles)
          const insectCenterX = insectX + 40;
          const insectCenterY = insectY + 40;
          
          // Calculate distance between projectile center and insect center
          const distance = Math.sqrt(
            Math.pow(bulletX - insectCenterX, 2) + 
            Math.pow(currentY - insectCenterY, 2)
          );
          
          // Collision detection with more generous hitbox (60 pixels radius)
          if (distance < 60) {
            console.log('Collision detected!', {
              insectId: insect.id,
              insectPos: { x: insectX, y: insectY },
              bulletPos: { x: bulletX, y: currentY },
              distance
            });
            
            hasHit = true;
            killInsect(insect.id);
            
            // Remove projectile
            setProjectiles((prev) => prev.filter((p) => p.id !== projectile.id));
          }
        });
      }, i * checkInterval);
    }
  };

  const killInsect = (insectId: number) => {
    const insect = insectsRef.current.find((i) => i.id === insectId);
    if (!insect || !insect.isAlive) return;

    console.log('Killing insect:', insectId);

    // Mark insect as dead
    insect.isAlive = false;

    // Animate insect disappearing
    Animated.parallel([
      Animated.timing(insect.scale, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(insect.rotation, {
        toValue: (insect.rotation as any)._value + 360,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Update state to remove insect from view
      setInsects((prev) => prev.filter((i) => i.id !== insectId));
    });

    // Update score
    const newScore = score + 1;
    setScore(newScore);
    onScoreChange(newScore);
    
    console.log('Score updated:', newScore);
  };

  return (
    <>
      <View style={styles.gameArea} pointerEvents="none">
        {insects.map((insect) => {
          const rotateInterpolate = insect.rotation.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg'],
          });

          return (
            <Animated.View
              key={insect.id}
              style={[
                styles.insectContainer,
                {
                  transform: [
                    { translateX: insect.x },
                    { translateY: insect.y },
                    { scale: insect.scale },
                    { rotate: rotateInterpolate },
                  ],
                },
              ]}
              pointerEvents="none"
            >
              <Image
                source={{ uri: IMAGE_URL.INSECTS[insect.type] }}
                style={styles.insectImage}
                resizeMode="contain"
              />
            </Animated.View>
          );
        })}
      </View>

      {/* Projectiles */}
      <View style={styles.projectilesContainer} pointerEvents="none">
        {projectiles.map((projectile) => (
          <Animated.View
            key={projectile.id}
            style={[
              styles.projectile,
              {
                transform: [
                  { translateX: projectile.x },
                  { translateY: projectile.y },
                ],
              },
            ]}
          >
            <View style={styles.projectileDot}>
              <View style={styles.projectileInner} />
            </View>
          </Animated.View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  gameArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height,
  },
  insectContainer: {
    position: 'absolute',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insectImage: {
    width: 80,
    height: 80,
  },
  projectilesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height,
    pointerEvents: 'none',
    zIndex: 100,
  },
  projectile: {
    position: 'absolute',
    width: 20,
    height: 20,
    marginLeft: -10,
    marginTop: -10,
    zIndex: 100,
  },
  projectileDot: {
    width: 20,
    height: 20,
    borderRadius: 30,
    // backgroundColor: '#FFD700',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    // shadowColor: '#FFD700',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.8,
    // shadowRadius: 4,
  },
  projectileInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
});