import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { X, Bell, Gift, Trophy, Star, Zap } from 'lucide-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'game';
}

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function NotificationModal({
  visible,
  onClose,
}: NotificationModalProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Mock notification data - simplified for testing
  const notifications: NotificationItem[] = [
    {
      id: '1',
      title: 'Test Notification',
      message: 'This is a test notification to cture and ce modal is working.',
      time: '1 min ago',
      read: false,
      type: 'info',
    },
    {
      id: '2',
      title: 'Welcome to Bubble Shooter!',
      message: 'Start your bubble shooting adventure and climb the leaderboard!',
      time: '2 min ago',
      read: false,
      type: 'game',
    },
    {
      id: '3',
      title: 'Daily Bonus Available',
      message: 'Claim your daily bonus coins and power-ups now!',
      time: '1 hour ago',
      read: false,
      type: 'success',
    },
  ];

  useEffect(() => {
    if (visible) {
      // Show animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
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
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '🎉';
      case 'warning':
        return '⚠️';
      case 'game':
        return '🎮';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return '#4CAF50';
      case 'warning':
        return '#FF9800';
      case 'game':
        return '#9C27B0';
      default:
        return '#2196F3';
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
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
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.modalContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Notifications</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Notifications List */}
          <ScrollView 
            style={styles.notificationsList} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.notificationsContent}
          >
            {notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationItem,
                  !notification.read && styles.unreadNotification,
                ]}
                activeOpacity={0.7}
              >
                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <View style={styles.iconContainer}>
                      <Text style={styles.notificationIcon}>
                        {getNotificationIcon(notification.type)}
                      </Text>
                      <View
                        style={[
                          styles.typeBadge,
                          { backgroundColor: getNotificationColor(notification.type) },
                        ]}
                      />
                    </View>
                    <View style={styles.notificationTextContainer}>
                      <Text style={styles.notificationTitle}>{notification.title}</Text>
                      <Text style={styles.notificationTime}>{notification.time}</Text>
                    </View>
                    {!notification.read && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.notificationMessage}>{notification.message}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.markAllReadButton}>
              <Text style={styles.markAllReadText}>Mark All as Read</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = {
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  overlayTouch: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: wp(4),
    width: wp(90),
    height: hp(75), // Fixed height instead of maxHeight
    borderWidth: 1,
    borderColor: COLORS.primary,
    shadowColor: COLORS.shadowPrimary,
    zIndex: 1001,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(6),
    paddingVertical: hp(2.5),
    backgroundColor: COLORS.gameAccentLight,
    borderTopLeftRadius: wp(3),
    borderTopRightRadius: wp(3),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderPrimary,
  },
  headerTitle: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
    color: COLORS.primary,
    textShadowColor: COLORS.borderPrimary,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  closeButton: {
    padding: wp(2),
    backgroundColor: COLORS.gameOverlayLight,
    borderRadius: wp(5),
  },
  notificationsList: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  notificationsContent: {
    paddingVertical: hp(2),
  },
  notificationItem: {
    backgroundColor: COLORS.gameOverlayLight,
    borderRadius: wp(3),
    marginVertical: hp(0.8),
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    minHeight: hp(8), // Ensure minimum height
  },
  unreadNotification: {
    backgroundColor: COLORS.gameAccentLight,
    borderColor: COLORS.borderPrimary,
    borderWidth: 2, // Thicker border for unread
  },
  notificationContent: {
    padding: wp(4),
    minHeight: hp(6), // Ensure content is visible
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: hp(1),
  },
  iconContainer: {
    position: 'relative',
    marginRight: wp(3),
  },
  notificationIcon: {
    fontSize: RFValue(15),
  },
  typeBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: wp(3),
    height: wp(3),
    borderRadius: wp(1.5),
    borderWidth: 1,
    borderColor: COLORS.cardBackground,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: RFValue(10),
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: hp(0.5),
  },
  notificationTime: {
    fontSize: RFValue(8),
    bottom: wp(1),
    color: COLORS.textMuted,
  },
  unreadDot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    backgroundColor: COLORS.primary,
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
  notificationMessage: {
    fontSize: RFValue(10),
    color: COLORS.textSecondary,
    lineHeight: RFValue(18),
  },
  footer: {
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSecondary,
    backgroundColor: COLORS.gameOverlayLight,
  },
  markAllReadButton: {
    backgroundColor: COLORS.borderSecondary,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(6),
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: COLORS.borderPrimary,
    alignSelf: 'center',
  },
  markAllReadText: {
    fontSize: RFValue(10),
    color: COLORS.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
} as const;