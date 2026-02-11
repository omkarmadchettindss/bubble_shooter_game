import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Lock, Star } from 'lucide-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { IMAGE_URL } from '../constants/image';
import { COLORS } from '../constants/colors';
import { styles } from './styles/LevelScreen.styles';
import Svg, { Path } from 'react-native-svg';

interface Level {
  id: number;
  levelNumber: number;
  isUnlocked: boolean;
  stars: number;
  x: number;
  y: number;
}

export default function LevelScreen() {
  const navigation = useNavigation();
  const coinCount = 1258;

  const handleBackPress = () => {
    navigation.goBack();
  };

  // Helper function to get point on cubic bezier curve at t (0 to 1)
  const getPointOnCurve = (
    p0x: number, p0y: number,
    cp1x: number, cp1y: number,
    cp2x: number, cp2y: number,
    p1x: number, p1y: number,
    t: number
  ) => {
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;
    const t2 = t * t;
    const t3 = t2 * t;
    
    return {
      x: mt3 * p0x + 3 * mt2 * t * cp1x + 3 * mt * t2 * cp2x + t3 * p1x,
      y: mt3 * p0y + 3 * mt2 * t * cp1y + 3 * mt * t2 * cp2y + t3 * p1y
    };
  };

  // Helper function to get point on line at t (0 to 1)
  const getPointOnLine = (x1: number, y1: number, x2: number, y2: number, t: number) => {
    return {
      x: x1 + (x2 - x1) * t,
      y: y1 + (y2 - y1) * t
    };
  };

  // Define the base path structure - dynamically generated for 100 levels
  const generatePathPoints = () => {
    const points = [];
    const rowSpacing = hp(12);
    const startY = hp(10);
    const leftX = wp(20);
    const rightX = wp(80);
    
    // Generate 50 rows (100 points) to accommodate 100 levels
    for (let i = 0; i < 50; i++) {
      const y = startY + (i * rowSpacing);
      
      if (i % 2 === 0) {
        // Even rows: Left to Right
        points.push({ x: leftX, y });
        points.push({ x: rightX, y });
      } else {
        // Odd rows: Right to Left
        points.push({ x: rightX, y });
        points.push({ x: leftX, y });
      }
    }
    
    return points;
  };

  const basePathPoints = generatePathPoints();

  // Generate levels with EQUAL spacing along the path
  const generateLevelsOnPath = (numLevels: number) => {
    const levels: Level[] = [];
    
    // Calculate total path length
    const calculatePathLength = () => {
      let totalLength = 0;
      
      for (let i = 1; i < basePathPoints.length; i++) {
        const prev = basePathPoints[i - 1];
        const curr = basePathPoints[i];
        const deltaY = curr.y - prev.y;
        
        if (Math.abs(deltaY) < hp(5)) {
          // Straight line distance
          const dx = curr.x - prev.x;
          const dy = curr.y - prev.y;
          totalLength += Math.sqrt(dx * dx + dy * dy);
        } else {
          // Approximate curve length using multiple samples
          const samples = 20;
          let curveLength = 0;
          
          const horizontalOffset = Math.abs(curr.x - prev.x) * 0.4;
          const cp1x = prev.x + (curr.x > prev.x ? horizontalOffset : -horizontalOffset);
          const cp1y = prev.y + (deltaY * 0.6);
          const cp2x = curr.x + (prev.x > curr.x ? horizontalOffset : -horizontalOffset);
          const cp2y = curr.y - (deltaY * 0.6);
          
          let prevPoint = { x: prev.x, y: prev.y };
          for (let s = 1; s <= samples; s++) {
            const t = s / samples;
            const point = getPointOnCurve(prev.x, prev.y, cp1x, cp1y, cp2x, cp2y, curr.x, curr.y, t);
            const dx = point.x - prevPoint.x;
            const dy = point.y - prevPoint.y;
            curveLength += Math.sqrt(dx * dx + dy * dy);
            prevPoint = point;
          }
          totalLength += curveLength;
        }
      }
      
      return totalLength;
    };
    
    // Get point at specific distance along path
    const getPointAtDistance = (targetDistance: number) => {
      let accumulatedDistance = 0;
      
      for (let i = 1; i < basePathPoints.length; i++) {
        const prev = basePathPoints[i - 1];
        const curr = basePathPoints[i];
        const deltaY = curr.y - prev.y;
        
        if (Math.abs(deltaY) < hp(5)) {
          // Straight line segment
          const dx = curr.x - prev.x;
          const dy = curr.y - prev.y;
          const segmentLength = Math.sqrt(dx * dx + dy * dy);
          
          if (accumulatedDistance + segmentLength >= targetDistance) {
            const remainingDistance = targetDistance - accumulatedDistance;
            const t = remainingDistance / segmentLength;
            return getPointOnLine(prev.x, prev.y, curr.x, curr.y, t);
          }
          
          accumulatedDistance += segmentLength;
        } else {
          // Curve segment
          const samples = 20;
          const horizontalOffset = Math.abs(curr.x - prev.x) * 0.4;
          const cp1x = prev.x + (curr.x > prev.x ? horizontalOffset : -horizontalOffset);
          const cp1y = prev.y + (deltaY * 0.6);
          const cp2x = curr.x + (prev.x > curr.x ? horizontalOffset : -horizontalOffset);
          const cp2y = curr.y - (deltaY * 0.6);
          
          let prevPoint = { x: prev.x, y: prev.y };
          
          for (let s = 1; s <= samples; s++) {
            const t = s / samples;
            const point = getPointOnCurve(prev.x, prev.y, cp1x, cp1y, cp2x, cp2y, curr.x, curr.y, t);
            const dx = point.x - prevPoint.x;
            const dy = point.y - prevPoint.y;
            const segmentLength = Math.sqrt(dx * dx + dy * dy);
            
            if (accumulatedDistance + segmentLength >= targetDistance) {
              const remainingDistance = targetDistance - accumulatedDistance;
              const ratio = remainingDistance / segmentLength;
              return {
                x: prevPoint.x + (point.x - prevPoint.x) * ratio,
                y: prevPoint.y + (point.y - prevPoint.y) * ratio
              };
            }
            
            accumulatedDistance += segmentLength;
            prevPoint = point;
          }
        }
      }
      
      // If we've gone past the end, return the last point
      return basePathPoints[basePathPoints.length - 1];
    };
    
    const totalLength = calculatePathLength();
    const spacing = totalLength / (numLevels - 1);
    
    // Generate levels at equal intervals
    for (let i = 0; i < numLevels; i++) {
      const distance = i * spacing;
      const point = getPointAtDistance(distance);
      
      // Deterministic star pattern based on level number
      const getStarsForLevel = (levelNum: number) => {
        if (levelNum <= 3) return 3;
        if (levelNum <= 6) return 2;
        if (levelNum <= 9) return 1;
        // All other levels get 0 stars but are still unlocked
        return 0;
      };
      
      levels.push({
        id: i + 1,
        levelNumber: i + 1,
        isUnlocked: true, // All levels unlocked
        stars: getStarsForLevel(i + 1),
        x: point.x,
        y: point.y
      });
    }
    
    return levels;
  };

  const [levels] = React.useState(() => generateLevelsOnPath(100));

  const handleLevelPress = (level: Level) => {
    if (level.isUnlocked) {
      console.log(`Starting level ${level.levelNumber}`);
      (navigation.navigate as any)('Play', { levelNumber: level.levelNumber });
    }
  };

  const renderStars = (stars: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3].map((star) => (
          <Star
            key={star}
            size={RFValue(8)}
            color={star <= stars ? COLORS.warning : COLORS.textMuted}
            fill={star <= stars ? COLORS.warning : 'transparent'}
            strokeWidth={2}
          />
        ))}
      </View>
    );
  };

  // Generate complete snake path with rounded corners at turns
  const generateSnakePath = () => {
    if (basePathPoints.length === 0) return '';
    
    let pathString = `M ${basePathPoints[0].x} ${basePathPoints[0].y}`;
    
    const cornerRadius = wp(13);
    
    for (let i = 1; i < basePathPoints.length; i++) {
      const prev = basePathPoints[i - 1];
      const curr = basePathPoints[i];
      const next = i < basePathPoints.length - 1 ? basePathPoints[i + 1] : null;
      
      const deltaX = curr.x - prev.x;
      const deltaY = curr.y - prev.y;
      
      if (Math.abs(deltaY) < hp(5)) {
        // Horizontal line
        if (next) {
          const nextDeltaY = next.y - curr.y;
          const isNextCurve = Math.abs(nextDeltaY) >= hp(5);
          
          if (isNextCurve) {
            const lineEndX = curr.x + (deltaX > 0 ? -cornerRadius : cornerRadius);
            pathString += ` L ${lineEndX} ${curr.y}`;
            
            const controlX = curr.x;
            const controlY = curr.y;
            const endX = curr.x;
            const endY = curr.y + (nextDeltaY > 0 ? cornerRadius : -cornerRadius);
            
            pathString += ` Q ${controlX} ${controlY}, ${endX} ${endY}`;
          } else {
            pathString += ` L ${curr.x} ${curr.y}`;
          }
        } else {
          pathString += ` L ${curr.x} ${curr.y}`;
        }
      } else {
        // Vertical S-curve with MORE curviness
        const horizontalOffset = Math.abs(curr.x - prev.x) * 0.4;
        
        const cp1x = prev.x + (curr.x > prev.x ? horizontalOffset : -horizontalOffset);
        const cp1y = prev.y + (deltaY * 0.6);
        
        const cp2x = curr.x + (prev.x > curr.x ? horizontalOffset : -horizontalOffset);
        const cp2y = curr.y - (deltaY * 0.6);
        
        if (next) {
          const nextDeltaX = next.x - curr.x;
          const isNextHorizontal = Math.abs(nextDeltaX) > wp(10);
          
          if (isNextHorizontal) {
            const curveEndY = curr.y - (deltaY > 0 ? cornerRadius : -cornerRadius);
            const tempCp2y = cp2y - (deltaY > 0 ? cornerRadius * 0.5 : -cornerRadius * 0.5);
            
            pathString += ` C ${cp1x} ${cp1y}, ${cp2x} ${tempCp2y}, ${curr.x} ${curveEndY}`;
            
            const controlX = curr.x;
            const controlY = curr.y;
            const endX = curr.x + (nextDeltaX > 0 ? cornerRadius : -cornerRadius);
            const endY = curr.y;
            
            pathString += ` Q ${controlX} ${controlY}, ${endX} ${endY}`;
          } else {
            pathString += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
          }
        } else {
          pathString += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
        }
      }
    }
    
    return pathString;
  };

  return (
    <ImageBackground source={{ uri: IMAGE_URL.BG }} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Image
              source={{ uri: IMAGE_URL.X_BUTTON }}
              style={styles.backButtonIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

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
        </View>

        {/* Scrollable Level Map */}
        <ScrollView
          style={styles.levelMapContainer}
          contentContainerStyle={styles.levelMapContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.pathContainer}>
            {/* Snake Path with rounded corners */}
            <Svg height={hp(610)} width="100%" style={styles.snakePath}>
              {/* Outer glow */}
              <Path
                d={generateSnakePath()}
                stroke="rgba(139, 92, 46, 0.3)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Shadow */}
              <Path
                d={generateSnakePath()}
                stroke="rgba(0, 0, 0, 0.5)"
                strokeWidth="17"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Main brown path */}
              <Path
                d={generateSnakePath()}
                stroke="#A0704A"
                strokeWidth="15"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Inner highlight */}
              <Path
                d={generateSnakePath()}
                stroke="#C8986C"
                strokeWidth="15"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* White dotted line */}
              <Path
                d={generateSnakePath()}
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="8,12"
              />
            </Svg>

            {/* Level Nodes */}
            {levels.map((level) => {
              const isHardLevel = level.levelNumber % 10 === 0;
              const isClickable = level.isUnlocked; // Use isUnlocked instead of stars
              
              return (
                <View
                  key={level.id}
                  style={{
                    position: 'absolute',
                    left: level.x - wp(10),
                    top: level.y - wp(10),
                    width: wp(20),
                    height: wp(20),
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 100,
                    opacity: isClickable ? 1 : 0.75,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handleLevelPress(level)}
                    activeOpacity={isClickable ? 0.7 : 1}
                    disabled={!isClickable}
                    style={styles.levelNodeTouchable}
                  >
                    <ImageBackground
                      source={{ uri: isHardLevel ? IMAGE_URL.HARD_LEVEL_BG : IMAGE_URL.LEVEL_NUM_BG }}
                      style={styles.levelNode}
                      resizeMode="contain"
                    >
                      {isHardLevel ? (
                        <Text style={styles.hardLevelText}></Text>
                      ) : (
                        <>
                          <Text style={styles.levelNumber}>{level.levelNumber}</Text>
                          {level.stars > 0 && renderStars(level.stars)}
                        </>
                      )}
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}