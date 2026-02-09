import React, { useState } from 'react';
import { View, Text, ImageBackground, Switch, TouchableOpacity, Image } from 'react-native';
import { Volume2, Music, Smartphone, Bell, Settings as SettingsIcon } from 'lucide-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { IMAGE_URL } from '../constants/image';
import { COLORS } from '../constants/colors';
import { styles } from './styles/SettingsScreen.styles';

interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  value: boolean;
}

export default function SettingsScreen() {
  const [settings, setSettings] = useState<SettingItem[]>([
    {
      id: 'sound',
      title: 'Sound',
      description: 'Enable game sound effects',
      icon: <Volume2 size={24} color={COLORS.primary} />,
      value: true,
    },
    {
      id: 'music',
      title: 'Music',
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
      title: 'Notifications',
      description: 'Receive game notifications',
      icon: <Bell size={24} color={COLORS.primary} />,
      value: true,
    },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(prevSettings =>
      prevSettings.map(setting =>
        setting.id === id ? { ...setting, value: !setting.value } : setting
      )
    );
  };

  return (
    <ImageBackground source={{ uri: IMAGE_URL.BG }} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          {/* <SettingsIcon size={28} color={COLORS.primary} /> */}
          <Text style={styles.title}>Settings</Text>
        </View>

        {/* Settings Card */}
        <View style={styles.settingsCardContainer}>
          <Image
            source={{ uri: IMAGE_URL.SETTING_CARD }}
            style={styles.settingsCardBackground}
            resizeMode="stretch"
          />
          <View style={styles.settingsCardContent}>
            {settings.map((setting, index) => (
              <View 
                key={setting.id} 
                style={[
                  styles.settingItem,
                  index === settings.length - 1 && styles.lastSettingItem
                ]}
              >
                <TouchableOpacity 
                  style={styles.settingContent}
                  onPress={() => toggleSetting(setting.id)}
                >
                  {/* <View style={styles.settingIcon}>
                    {setting.icon}
                  </View> */}
                  <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>{setting.title}</Text>
                    {/* <Text style={styles.settingDescription}>{setting.description}</Text> */}
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
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.footerText}>
              Changes are saved automatically
            </Text>
          </View>
        </View>
      </View>
      
    </ImageBackground>
  );
}


