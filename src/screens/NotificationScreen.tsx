import React from 'react';
import { View, ImageBackground, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { IMAGE_URL } from '../constants/image';
import { styles } from './styles/NotificationScreen.styles';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationScreen() {
  const notifications: NotificationItem[] = [
    {
      id: '1',
      title: 'Daily Reward Ready! 🎁',
      message: 'Your daily bonus is waiting! Claim 500 coins and exclusive power-ups now!',
      time: '2 min ago',
      read: false,
    },
    {
      id: '2',
      title: 'New High Score! 🏆',
      message: 'Congratulations! You just beat your personal best with 15,420 points!',
      time: '15 min ago',
      read: false,
    },
    {
      id: '3',
      title: 'Level Up! ⭐',
      message: 'Amazing! You\'ve reached Level 25. New challenges unlocked!',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '4',
      title: 'Limited Time Event! ⚡',
      message: 'Double coins event is live! Play now and earn 2x rewards for the next 3 hours!',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '5',
      title: 'Daily Reward Ready! 🎁',
      message: 'Your daily bonus is waiting! Claim 500 coins and exclusive power-ups now!',
      time: '2 min ago',
      read: false,
    },
    {
      id: '6',
      title: 'New High Score! 🏆',
      message: 'Congratulations! You just beat your personal best with 15,420 points!',
      time: '15 min ago',
      read: false,
    },
    {
      id: '7',
      title: 'Level Up! ⭐',
      message: 'Amazing! You\'ve reached Level 25. New challenges unlocked!',
      time: '1 hour ago',
      read: true,
    },
  ];

  return (
    <ImageBackground source={{ uri: IMAGE_URL.BG }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.notificationBoardContainer}>
          <Image 
            source={{ uri: IMAGE_URL.NOTIFICATION_BG }} 
            style={styles.notificationImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>Notifications</Text>
          <View style={styles.notificationsWrapper}>
            <ScrollView 
              style={styles.notificationsList}
              contentContainerStyle={styles.notificationsContent}
              showsVerticalScrollIndicator={false}
            >
              {notifications.map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  style={[
                    styles.notificationItem,
                    !notification.read && styles.unreadNotification,
                  ]}
                  activeOpacity={0.8}
                >
                  <View style={styles.notificationContent}>
                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                    <Text style={styles.notificationMessage}>{notification.message}</Text>
                    <Text style={styles.notificationTime}>{notification.time}</Text>
                  </View>
                  {!notification.read && <View style={styles.unreadDot} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
