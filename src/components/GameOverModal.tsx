import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');

interface GameOverModalProps {
  visible: boolean;
  score: number;
  maxScore: number;
  onNext: () => void;
  onExit: () => void;
}

export default function GameOverModal({
  visible,
  score,
  maxScore,
  onNext,
  onExit,
}: GameOverModalProps) {
  const isWin = score >= maxScore;
  const progressPercentage = (score / maxScore) * 100;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Title */}
          <Text style={styles.title}>
            {isWin ? '🎉 Level Complete!' : 'Game Over'}
          </Text>

          {/* Score Display */}
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Score</Text>
            <Text style={styles.scoreValue}>
              {score} / {maxScore}
            </Text>
            
            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <View 
                  style={[
                    styles.progressBarFill, 
                    { width: `${progressPercentage}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressPercentage}>{Math.round(progressPercentage)}%</Text>
            </View>
          </View>

          {/* Message */}
          <Text style={styles.message}>
            {isWin
              ? 'Congratulations! You cleared all insects!'
              : 'Keep trying to get all insects!'}
          </Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.exitButton]}
              onPress={onExit}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Exit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.nextButton]}
              onPress={onNext}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: wp(85),
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: wp(6),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: hp(2),
    textAlign: 'center',
  },
  scoreContainer: {
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    borderRadius: 15,
    padding: wp(4),
    marginBottom: hp(2),
    width: '100%',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: RFValue(14),
    color: COLORS.textSecondary,
    marginBottom: hp(0.5),
  },
  scoreValue: {
    fontSize: RFValue(32),
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: hp(1.5),
  },
  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBarBackground: {
    width: '100%',
    height: hp(1.5),
    backgroundColor: 'rgba(123, 104, 238, 0.2)',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: hp(0.5),
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  progressPercentage: {
    fontSize: RFValue(12),
    color: COLORS.primary,
    fontWeight: '600',
  },
  message: {
    fontSize: RFValue(14),
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: hp(3),
    lineHeight: RFValue(20),
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: wp(3),
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: hp(1.5),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitButton: {
    backgroundColor: COLORS.textSecondary,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
