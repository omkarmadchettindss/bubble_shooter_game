import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, Animated } from 'react-native';
import { MoreVertical, LogOut, Trash2 } from 'lucide-react-native';
import { useIsFocused } from '@react-navigation/native';
import { IMAGE_URL } from '../constants/image';
import { COLORS } from '../constants/colors';
import { styles } from './styles/ProfileScreen.styles';
import SettingsModal from '../components/SettingsModal';
import CustomAlert from '../components/CustomAlert';

interface ProfileScreenProps {
  userWallet: string;
  userReferralCode: string;
  onLogout: () => void;
}

export default function ProfileScreen({ userWallet, userReferralCode, onLogout }: ProfileScreenProps) {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const menuAnimation = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();
  
  // Profile frame animations
  const frameScale = useRef(new Animated.Value(0.8)).current;
  const frameOpacity = useRef(new Animated.Value(0)).current;
  const contentSlide = useRef(new Animated.Value(50)).current;
  const glowPulse = useRef(new Animated.Value(0)).current;

  // Animate profile frame whenever screen comes into focus
  React.useEffect(() => {
    if (isFocused) {
      // Reset animations to initial state
      frameScale.setValue(0.8);
      frameOpacity.setValue(0);
      contentSlide.setValue(50);
      
      // Start entrance animation
      Animated.parallel([
        Animated.spring(frameScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(frameOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(contentSlide, {
          toValue: 0,
          tension: 50,
          friction: 8,
          delay: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isFocused]);

  // Continuous glow pulse animation
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowPulse, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleSettingsPress = () => {
    setShowSettingsModal(true);
  };

  const handleMenuToggle = () => {
    const toValue = showMenuDropdown ? 0 : 1;
    setShowMenuDropdown(!showMenuDropdown);
    
    Animated.spring(menuAnimation, {
      toValue,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const handleMenuItemPress = (action: 'logout' | 'delete') => {
    setShowMenuDropdown(false);
    Animated.spring(menuAnimation, {
      toValue: 0,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();

    if (action === 'logout') {
      setShowLogoutAlert(true);
    } else if (action === 'delete') {
      setShowDeleteAlert(true);
    }
  };

  const handleLogoutConfirm = () => {
    onLogout();
  };

  const handleDeleteConfirm = () => {
    console.log('Account deletion confirmed');
    setShowDeleteAlert(false);
  };

  return (
    <ImageBackground source={{ uri: IMAGE_URL.BG }} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
              <Image 
                source={{ uri: IMAGE_URL.SETTING_BUTTON }} 
                style={styles.settingsIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={handleMenuToggle}>
              <MoreVertical size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>

            {/* Dropdown Menu */}
            {showMenuDropdown && (
              <Animated.View
                style={[
                  styles.dropdownMenu,
                  {
                    opacity: menuAnimation,
                    transform: [
                      {
                        scale: menuAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 1],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleMenuItemPress('logout')}
                  activeOpacity={0.7}
                >
                  <LogOut size={18} color={COLORS.secondary} />
                  <Text style={styles.dropdownItemText}>Logout</Text>
                </TouchableOpacity>
                
                <View style={styles.dropdownDivider} />
                
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleMenuItemPress('delete')}
                  activeOpacity={0.7}
                >
                  <Trash2 size={18} color={COLORS.secondary} />
                  <Text style={styles.dropdownItemText}>Delete Account</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
        </View>

        {/* Profile Frame Only - Centered */}
        <View style={styles.profileSection}>
          <Animated.View 
            style={[
              styles.avatarContainer,
              {
                opacity: frameOpacity,
                transform: [{ scale: frameScale }],
              }
            ]}
          >
            {/* Animated Glow Effect */}
            <Animated.View
              style={[
                styles.glowEffect,
                {
                  opacity: glowPulse.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 0.7],
                  }),
                  transform: [
                    {
                      scale: glowPulse.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.05],
                      }),
                    },
                  ],
                },
              ]}
            />
            
            <Image 
              source={{ uri: IMAGE_URL.PROFILE_FRAME }}
              style={styles.profileFrame}
              resizeMode="contain"
            />
            
            {/* Light Blue Content Section */}
            <Animated.View 
              style={[
                styles.profileContent,
                {
                  transform: [{ translateY: contentSlide }],
                  opacity: frameOpacity,
                }
              ]}
            >
              {/* Left Side - Profile Image and Stats */}
              <View style={styles.profileLeft}>
                {/* Profile Image */}
                <View style={styles.profileImageContainer}>
                  <Image 
                    source={{ uri: IMAGE_URL.PROFILE_IMG }}
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
                  <TouchableOpacity style={styles.editIconButton}>
                    <Text style={styles.editIconText}>✏️</Text>
                  </TouchableOpacity>
                </View>
                
                {/* Stats */}
                <View style={styles.profileStats}>
                  <Text style={styles.profileName}>FaultyGlee4</Text>
                  
                  <View style={styles.statRow}>
                    <Text style={[styles.statIcon, { color: '#4FC3F7' }]}>✦</Text>
                    <Text style={styles.statText}>Total Star: 21</Text>
                  </View>
                  
                  <View style={styles.statRow}>
                    <Text style={[styles.statIcon, { color: '#4FC3F7' }]}>✕</Text>
                    <Text style={styles.statText}>PvP Games: 0</Text>
                  </View>
                  
                  {/* <View style={styles.statRow}>
                    <Text style={[styles.statIcon, { color: '#4FC3F7' }]}>🏆</Text>
                    <Text style={styles.statText}>PvP Winrate: 0%</Text>
                  </View> */}
                </View>
              </View>
              
              {/* Right Side - VIP Badge */}
              <View style={styles.profileRight}>
                <Image 
                  source={{ uri: 'https://res.cloudinary.com/dfhkitqpl/image/upload/v1770894048/Bubble%20Shooting%20Game/vip_badge.webp' }}
                  style={styles.vipBadge}
                  resizeMode="contain"
                />
              </View>
            </Animated.View>
          </Animated.View>
        </View>
      </View>

      {/* Settings Modal */}
      <SettingsModal
        visible={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />

      {/* Logout Alert */}
      <CustomAlert
        visible={showLogoutAlert}
        title="Logout"
        message="Are you sure you want to disconnect your wallet?"
        buttons={[
          { text: 'Cancel', style: 'cancel', onPress: () => setShowLogoutAlert(false) },
          { text: 'Logout', style: 'destructive', onPress: handleLogoutConfirm },
        ]}
        onClose={() => setShowLogoutAlert(false)}
      />

      {/* Delete Account Alert */}
      <CustomAlert
        visible={showDeleteAlert}
        title="Delete Account"
        message="This action cannot be undone. Are you sure you want to permanently delete your account and all associated data?"
        buttons={[
          { text: 'Cancel', style: 'cancel', onPress: () => setShowDeleteAlert(false) },
          { text: 'Delete', style: 'destructive', onPress: handleDeleteConfirm },
        ]}
        onClose={() => setShowDeleteAlert(false)}
      />
    </ImageBackground>
  );
}
