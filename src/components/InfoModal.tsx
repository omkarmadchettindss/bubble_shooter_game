import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { X, Info, Target, Trophy, Zap } from 'lucide-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function InfoModal({ visible, onClose }: InfoModalProps) {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      // Reset animation values before starting
      slideAnim.setValue(height);
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);
      
      // Show animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Hide animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.overlayTouch}
          activeOpacity={1}
          onPress={handleClose}
        />
        
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Info size={24} color={COLORS.primary} />
              <Text style={styles.headerTitle}>Game Info</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <X size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Game Overview */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🎯 About Bubble Shooter</Text>
              <Text style={styles.sectionText}>
                Welcome to the ultimate bubble shooting experience! Aim, match, and pop colorful bubbles to clear the board and achieve high scores.
              </Text>
            </View>

            {/* How to Play */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Target size={20} color={COLORS.primary} />
                <Text style={styles.sectionTitle}>How to Play</Text>
              </View>
              <View style={styles.ruleItem}>
                <Text style={styles.ruleNumber}>1.</Text>
                <Text style={styles.ruleText}>Aim your bubble shooter at groups of same-colored bubbles</Text>
              </View>
              <View style={styles.ruleItem}>
                <Text style={styles.ruleNumber}>2.</Text>
                <Text style={styles.ruleText}>Match 3 or more bubbles of the same color to pop them</Text>
              </View>
              <View style={styles.ruleItem}>
                <Text style={styles.ruleNumber}>3.</Text>
                <Text style={styles.ruleText}>Clear all bubbles to complete the level</Text>
              </View>
              <View style={styles.ruleItem}>
                <Text style={styles.ruleNumber}>4.</Text>
                <Text style={styles.ruleText}>Use power-ups and special bubbles for higher scores</Text>
              </View>
            </View>

            {/* Scoring */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Trophy size={20} color={COLORS.primary} />
                <Text style={styles.sectionTitle}>Scoring System</Text>
              </View>
              <View style={styles.scoreItem}>
                <Text style={styles.scorePoints}>+10</Text>
                <Text style={styles.scoreDesc}>Basic bubble pop</Text>
              </View>
              <View style={styles.scoreItem}>
                <Text style={styles.scorePoints}>+25</Text>
                <Text style={styles.scoreDesc}>Chain reaction (4+ bubbles)</Text>
              </View>
              <View style={styles.scoreItem}>
                <Text style={styles.scorePoints}>+50</Text>
                <Text style={styles.scoreDesc}>Perfect shot bonus</Text>
              </View>
              <View style={styles.scoreItem}>
                <Text style={styles.scorePoints}>+100</Text>
                <Text style={styles.scoreDesc}>Level completion</Text>
              </View>
            </View>

            {/* Power-ups */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Zap size={20} color={COLORS.primary} />
                <Text style={styles.sectionTitle}>Power-ups</Text>
              </View>
              <View style={styles.powerUpItem}>
                <Text style={styles.powerUpIcon}>💥</Text>
                <View style={styles.powerUpInfo}>
                  <Text style={styles.powerUpName}>Bomb Bubble</Text>
                  <Text style={styles.powerUpDesc}>Destroys surrounding bubbles</Text>
                </View>
              </View>
              <View style={styles.powerUpItem}>
                <Text style={styles.powerUpIcon}>🌈</Text>
                <View style={styles.powerUpInfo}>
                  <Text style={styles.powerUpName}>Rainbow Bubble</Text>
                  <Text style={styles.powerUpDesc}>Matches any color</Text>
                </View>
              </View>
              <View style={styles.powerUpItem}>
                <Text style={styles.powerUpIcon}>⚡</Text>
                <View style={styles.powerUpInfo}>
                  <Text style={styles.powerUpName}>Lightning Bubble</Text>
                  <Text style={styles.powerUpDesc}>Clears entire row</Text>
                </View>
              </View>
            </View>

            {/* Tips */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>💡 Pro Tips</Text>
              <Text style={styles.tipText}>• Use walls to bounce bubbles into hard-to-reach spots</Text>
              <Text style={styles.tipText}>• Plan ahead - look at your next bubble</Text>
              <Text style={styles.tipText}>• Create chain reactions for maximum points</Text>
              <Text style={styles.tipText}>• Save power-ups for challenging situations</Text>
            </View>
          </ScrollView>

          {/* Footer */}
          {/* <View style={styles.footer}>
            <TouchableOpacity style={styles.playButton} onPress={handleClose}>
              <Text style={styles.playButtonText}>Got it! Let's Play</Text>
            </TouchableOpacity>
          </View> */}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = {
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  overlayTouch: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    width: wp(90),
    maxHeight: hp(90), // Increased from 80% to 90%
    minHeight: hp(70), // Added minimum height to ensure good content display
    backgroundColor: COLORS.cardBackground,
    borderRadius: wp(2),
    borderWidth: 2,
    borderColor: COLORS.borderPrimary,
    shadowColor: COLORS.shadowPrimary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
    marginVertical: hp(5), // Added margin to ensure it doesn't touch screen edges
  },
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSecondary,
  },
  headerLeft: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  headerTitle: {
    fontSize: RFValue(18),
    fontWeight: 'bold' as const,
    color: COLORS.textPrimary,
    marginLeft: wp(2),
  },
  closeButton: {
    padding: wp(2),
    borderRadius: wp(4),
    backgroundColor: COLORS.gameOverlayLight,
  },
  content: {
    flex: 1,
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
    minHeight: hp(50), // Added minimum height for content area
  },
  section: {
    marginBottom: hp(3.5), // Increased spacing between sections
  },
  sectionHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: hp(1),
  },
  sectionTitle: {
    fontSize: RFValue(16),
    fontWeight: 'bold' as const,
    color: COLORS.textPrimary,
    marginLeft: wp(2),
    marginBottom: hp(1),
  },
  sectionText: {
    fontSize: RFValue(13),
    color: COLORS.textSecondary,
    lineHeight: RFValue(20), // Increased line height for better readability
    marginBottom: hp(1), // Added bottom margin
  },
  ruleItem: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    marginBottom: hp(1.5), // Increased spacing between rules
    paddingVertical: hp(0.5), // Added padding for better touch targets
  },
  ruleNumber: {
    fontSize: RFValue(13),
    fontWeight: 'bold' as const,
    color: COLORS.primary,
    width: wp(6),
  },
  ruleText: {
    fontSize: RFValue(13),
    color: COLORS.textSecondary,
    flex: 1,
    lineHeight: RFValue(20), // Increased line height
  },
  scoreItem: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingVertical: hp(1), // Increased padding
    paddingHorizontal: wp(3),
    backgroundColor: COLORS.gameOverlayLight,
    borderRadius: wp(2),
    marginBottom: hp(1.5), // Increased margin
  },
  scorePoints: {
    fontSize: RFValue(14),
    fontWeight: 'bold' as const,
    color: COLORS.primary,
  },
  scoreDesc: {
    fontSize: RFValue(12),
    color: COLORS.textSecondary,
  },
  powerUpItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: hp(1.5), // Increased padding
    paddingHorizontal: wp(3),
    backgroundColor: COLORS.gameOverlayLight,
    borderRadius: wp(3),
    marginBottom: hp(1.5), // Increased margin
  },
  powerUpIcon: {
    fontSize: RFValue(20),
    marginRight: wp(3),
  },
  powerUpInfo: {
    flex: 1,
  },
  powerUpName: {
    fontSize: RFValue(13),
    fontWeight: 'bold' as const,
    color: COLORS.textPrimary,
  },
  powerUpDesc: {
    fontSize: RFValue(11),
    color: COLORS.textSecondary,
  },
  tipText: {
    fontSize: RFValue(12),
    color: COLORS.textSecondary,
    marginBottom: hp(1), // Increased spacing between tips
    lineHeight: RFValue(18), // Increased line height
    paddingLeft: wp(2), // Added left padding for better alignment
  },
  footer: {
    paddingHorizontal: wp(6),
    paddingVertical: hp(2.5), // Increased padding
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSecondary,
  },
  playButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: hp(2.5), // Increased button height
    borderRadius: wp(4),
    alignItems: 'center' as const,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  playButtonText: {
    fontSize: RFValue(14),
    fontWeight: 'bold' as const,
    color: COLORS.textPrimary,
  },
};