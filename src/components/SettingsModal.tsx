import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ImageBackground, Switch, TouchableOpacity, Modal, Animated, Image } from 'react-native';
import { Volume2, Music, Smartphone, Bell, X } from 'lucide-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { IMAGE_URL } from '../constants/image';
import { COLORS } from '../constants/colors';

interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  value: boolean;
}

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SettingsModal({ visible, onClose }: SettingsModalProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [settings, setSettings] = useState<SettingItem[]>([
    {
      id: 'sound',
      title: 'Sound Effects',
      description: 'Enable game sound effects',
      icon: <Volume2 size={24} color={COLORS.primary} />,
      value: true,
    },
    {
      id: 'music',
      title: 'Background Music',
      description: 'Play background music during gameplay',
      icon: <Music size={24} color={COLORS.primary} />,
      value: true,
    },
    {
      id: 'vibration',
      title: 'Vibration',
      description: 'Enable haptic feedback',
      icon: <Smartphone size={24} color={COLORS.primary} />,
      value: false,
    },
    {
      id: 'notifications',
      title: 'Push Notifications',
      description: 'Receive game notifications',
      icon: <Bell size={24} color={COLORS.primary} />,
      value: true,
    },
  ]);

  useEffect(() => {
    if (visible) {
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

  const toggleSetting = (id: string) => {
    setSettings(prevSettings =>
      prevSettings.map(setting =>
        setting.id === id ? { ...setting, value: !setting.value } : setting
      )
    );
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
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Settings Card */}
          <View style={styles.settingsCardContainer}>
            <Image
              source={{ uri: IMAGE_URL.SETTING_CARD }}
              style={styles.settingsCardBackground}
              resizeMode="stretch"
            />
            {/* Settings Title */}
            <View style={styles.titleContainer}>
              <Text style={styles.settingsTitle}>Settings</Text>
            </View>
            <View style={styles.settingsCardContent}>
              {settings.map((setting, index) => (
                <View 
                  key={setting.id} 
                  style={[
                    styles.settingItem,
                    index === settings.length - 1 && styles.lastSettingItem
                  ]}
                >
                  <View style={styles.settingContent}>
                    <View style={styles.settingText}>
                      <Text style={styles.settingTitle}>{setting.title}</Text>
                    </View>
                    <View style={styles.settingToggle}>
                      <Switch
                        value={setting.value}
                        onValueChange={() => toggleSetting(setting.id)}
                        trackColor={{ false: '#767577', true: COLORS.primary }}
                        thumbColor={setting.value ? '#ffffff' : '#f4f3f4'}
                        ios_backgroundColor="#767577"
                      />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = {
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
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
    width: wp(90),
    maxHeight: hp(70),
    alignSelf: 'center',
    zIndex: 1001,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: wp(6),
    paddingVertical: hp(2.5),
  },
  headerTitle: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: '#7d511cff',
    textShadowColor: COLORS.borderPrimary,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  closeButton: {
    padding: wp(2),
    backgroundColor: COLORS.gameOverlayLight,
    borderRadius: wp(5),
    bottom: wp(8),
    left: wp(4),
    zIndex: 100,
  },
  settingsCardContainer: {
    position: 'relative',
    zIndex: 10,
    bottom: 120
  },
  settingsCardBackground: {
    width: '120%',
    height: hp(70),
    position: 'absolute',
    top: -60,
    left: -45,
    pointerEvents: 'none',
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: hp(2),
    zIndex: 20,
  },
  settingsTitle: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    top:wp(3),
    color: '#7d511cff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  settingsCardContent: {
    paddingHorizontal: wp(8),
    paddingVertical: hp(6),
    zIndex: 15,
  },
  settingItem: {
    top: wp(-5),
    paddingVertical: hp(1.49),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 20,
  },
  lastSettingItem: {
    borderBottomWidth: 0,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(4),
    zIndex: 25,
    // top: -65,
    marginLeft: wp(2),
    marginRight: wp(4),
  },
  settingIcon: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: COLORS.gameOverlayLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(4),
  },
  settingText: {
    flex: 1,
    marginRight: wp(3),
    top: wp(0),
    left: wp(11),
  },
  settingTitle: {
    fontSize: RFValue(10),
    fontWeight: '600',
    color: '#dc8a25ff',
  },
  settingDescription: {
    fontSize: RFValue(8),
    color: COLORS.textSecondary,
    lineHeight: RFValue(16),
  },
  settingToggle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
} as const;