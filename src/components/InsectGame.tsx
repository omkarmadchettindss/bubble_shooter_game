import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { IMAGE_URL } from '../constants/image';
import ExplosionAnimation from '../assets/Explosion.json';

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
  x: number; // Fixed X position for straight line
  y: Animated.Value;
  opacity: Animated.Value;
}

interface ProjectileTrail {
  id: number;
  x: number;
  y: number;
  opacity: Animated.Value;
}

interface Explosion {
  id: number;
  x: number;
  y: number;
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
  const [projectileTrails, setProjectileTrails] = useState<ProjectileTrail[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [score, setScore] = useState(0);
  const projectileIdCounter = useRef(0);
  const trailIdCounter = useRef(0);
  const explosionIdCounter = useRef(0);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const gameAreaHeight = height * 0.75;

  useEffect(() => {
    if (!showInsects) return;

    // Create insects that will roam freely
    const insectTypes = Object.keys(IMAGE_URL.INSECTS) as Array<keyof typeof IMAGE_URL.INSECTS>;

    const newInsects: Insect[] = Array.from({ length: maxScore }, (_, i) => {
      const randomType = insectTypes[Math.floor(Math.random() * insectTypes.length)];
      
      // Random final position in top 75% area
      const finalX = Math.random() * (width - 100) + 50;
      const finalY = Math.random() * (gameAreaHeight - 150) + 80;
      
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
    startIntroAnimation(newInsects);

    return () => {
      insectsRef.current.forEach((insect) => {
        insect.x.stopAnimation();
        insect.y.stopAnimation();
        insect.rotation.stopAnimation();
      });
    };
  }, [showInsects]);

  const startIntroAnimation = (insects: Insect[]) => {
    // Insects fly in from sides and immediately start roaming
    insects.forEach((insect, i) => {
      // Random final position in top 75% area
      const finalX = Math.random() * (width - 100) + 50;
      const finalY = Math.random() * (gameAreaHeight - 150) + 80;
      
      // Stagger the animation slightly for each insect
      const delay = i * 80;
      
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(insect.x, {
            toValue: finalX,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(insect.rotation, {
            toValue: 360,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Immediately start roaming without pause
          animateInsect(insect);
        });
        
        // Enable shooting after the last insect starts its intro animation
        if (i === insects.length - 1) {
          setTimeout(() => {
            setIsIntroComplete(true);
          }, 1200); // Enable shooting when last insect arrives
        }
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
        useNativeDriver: true,
      }),
      Animated.timing(insect.y, {
        toValue: newY,
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.timing(insect.rotation, {
        toValue: newRotation,
        duration: duration,
        useNativeDriver: true,
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
      x: startX, // Fixed X position for straight line
      y: new Animated.Value(startY),
      opacity: new Animated.Value(1),
    };

    setProjectiles((prev) => [...prev, newProjectile]);

    const speed = 1200; // pixels per second (faster for smoother feel)
    const distance = startY + 100; // Distance to top of screen
    const duration = (distance / speed) * 1000;

    console.log('Projectile created:', { id: projectileId, startX, startY, duration });

    // Create trail effect - spawn trail particles periodically
    const trailInterval = setInterval(() => {
      const currentY = (newProjectile.y as any)._value;
      if (currentY < -50) {
        clearInterval(trailInterval);
        return;
      }
      
      const trailId = trailIdCounter.current++;
      const trailOpacity = new Animated.Value(0.8);
      
      const newTrail: ProjectileTrail = {
        id: trailId,
        x: startX,
        y: currentY,
        opacity: trailOpacity,
      };
      
      setProjectileTrails((prev) => [...prev, newTrail]);
      
      // Fade out trail
      Animated.timing(trailOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setProjectileTrails((prev) => prev.filter((t) => t.id !== trailId));
      });
    }, 30);

    // Animate projectile straight up with native driver for smooth performance
    Animated.timing(newProjectile.y, {
      toValue: -100,
      duration: duration,
      useNativeDriver: true, // Enable native driver for smooth animation
    }).start(() => {
      clearInterval(trailInterval);
      // Remove projectile after reaching top
      console.log('Projectile reached top:', projectileId);
      setProjectiles((prev) => prev.filter((p) => p.id !== projectileId));
    });

    // Check for collisions during flight - calculate positions based on time
    checkCollisionsDuringFlight(projectileId, duration, startX, startY);
  };

  const checkCollisionsDuringFlight = (projectileId: number, duration: number, bulletX: number, startY: number) => {
    // Check for collisions every 30ms during flight
    const checkInterval = 30;
    const checks = Math.floor(duration / checkInterval);
    
    let hasHit = false;
    const speed = 1200; // Same as shooting speed
    
    for (let i = 0; i < checks; i++) {
      setTimeout(() => {
        if (hasHit) return; // Stop checking if already hit something
        
        // Calculate bullet Y position based on elapsed time (since we can't read animated value with native driver)
        const elapsedTime = i * checkInterval;
        const distanceTraveled = (speed * elapsedTime) / 1000;
        const currentY = startY - distanceTraveled;
        
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
          
          // Collision detection with generous hitbox (60 pixels radius)
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
            setProjectiles((prev) => prev.filter((p) => p.id !== projectileId));
          }
        });
      }, i * checkInterval);
    }
  };

  const killInsect = (insectId: number) => {
    const insect = insectsRef.current.find((i) => i.id === insectId);
    if (!insect || !insect.isAlive) return;

    console.log('Killing insect:', insectId);

    // Mark insect as dead immediately to prevent duplicate kills
    insect.isAlive = false;

    // Get insect position for explosion
    const insectX = (insect.x as any)._value;
    const insectY = (insect.y as any)._value;

    // Create explosion at insect position
    const explosionId = explosionIdCounter.current++;
    const newExplosion: Explosion = {
      id: explosionId,
      x: insectX + 40, // Center of insect
      y: insectY + 40,
    };
    setExplosions((prev) => [...prev, newExplosion]);

    // Remove explosion after animation completes (approx 667ms for 20 frames at 30fps)
    setTimeout(() => {
      setExplosions((prev) => prev.filter((e) => e.id !== explosionId));
    }, 700);

    // Animate insect disappearing
    Animated.parallel([
      Animated.timing(insect.scale, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(insect.rotation, {
        toValue: (insect.rotation as any)._value + 360,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Update state to remove insect from view
      setInsects((prev) => prev.filter((i) => i.id !== insectId));
    });

    // Update score using functional update to avoid stale closure issues
    setScore((prevScore) => {
      const newScore = prevScore + 1;
      console.log('Score updated:', newScore);
      onScoreChange(newScore);
      return newScore;
    });
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

      {/* Explosions */}
      <View style={styles.explosionsContainer} pointerEvents="none">
        {explosions.map((explosion) => (
          <View
            key={explosion.id}
            style={[
              styles.explosionContainer,
              {
                left: explosion.x - 60, // Center the explosion (120/2)
                top: explosion.y - 60,
              },
            ]}
          >
            <LottieView
              source={ExplosionAnimation}
              autoPlay
              loop={false}
              style={styles.explosionAnimation}
            />
          </View>
        ))}
      </View>

      {/* Projectile Trails */}
      <View style={styles.projectilesContainer} pointerEvents="none">
        {projectileTrails.map((trail) => (
          <Animated.View
            key={trail.id}
            style={[
              styles.trailParticle,
              {
                left: trail.x - 15,
                top: trail.y - 15,
                opacity: trail.opacity,
              },
            ]}
          >
            <View style={styles.trailGlow} />
          </Animated.View>
        ))}
      </View>

      {/* Projectiles */}
      <View style={styles.projectilesContainer} pointerEvents="none">
        {projectiles.map((projectile) => (
          <Animated.View
            key={projectile.id}
            style={[
              styles.projectile,
              {
                left: projectile.x - 20,
                opacity: projectile.opacity,
                transform: [
                  { translateY: projectile.y },
                ],
              },
            ]}
          >
            <View style={styles.projectileGlowOuter}>
              <View style={styles.projectileGlowMiddle}>
                <View style={styles.projectileCore} />
              </View>
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
    left: -40,
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
  explosionsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height,
    pointerEvents: 'none',
    zIndex: 200,
  },
  explosionContainer: {
    position: 'absolute',
    width: 120,
    height: 120,
  },
  explosionAnimation: {
    width: 120,
    height: 120,
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
    width: 40,
    height: 40,
    zIndex: 100,
  },
  projectileGlowOuter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 100, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6400',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10,
  },
  projectileGlowMiddle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 140, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  projectileCore: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  trailParticle: {
    position: 'absolute',
    width: 30,
    height: 30,
    zIndex: 99,
  },
  trailGlow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 100, 0, 0.4)',
    shadowColor: '#FF6400',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
});