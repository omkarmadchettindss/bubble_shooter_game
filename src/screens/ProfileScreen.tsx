import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView, Animated } from 'react-native';
import { ChevronRight, Clock, Flame, GamepadIcon, MoreVertical, LogOut, Trash2 } from 'lucide-react-native';
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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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

        {/* Profile Avatar Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: IMAGE_URL.PROFILE_IMG }}
              style={styles.avatar}
            />
            <View style={styles.editBadge}>
              <Text style={styles.editIcon}>✏️</Text>
            </View>
          </View>
          <Text style={styles.username}>Omkar</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.statCardGreen]}>
            <View style={styles.statIconContainer}>
              <GamepadIcon size={24} color="#4A9B8E" strokeWidth={2} />
            </View>
            <Text style={styles.statNumber}>168</Text>
            <Text style={styles.statLabel}>TOTAL SESSIONS</Text>
          </View>

          <View style={[styles.statCard, styles.statCardPurple]}>
            <View style={styles.statIconContainer}>
              <Flame size={24} color="#8B5CF6" strokeWidth={2} />
            </View>
            <Text style={styles.statNumber}>119</Text>
            <Text style={styles.statLabel}>TOURNAMENTS</Text>
          </View>

          <View style={[styles.statCard, styles.statCardBrown]}>
            <View style={styles.statIconContainer}>
              <Clock size={24} color="#A0704A" strokeWidth={2} />
            </View>
            <Text style={styles.statNumber}>163<Text style={styles.statUnit}>M</Text></Text>
            <Text style={styles.statLabel}>PLAYTIME</Text>
          </View>
        </View>

        {/* Share Results Button */}
        <TouchableOpacity style={styles.shareButton} activeOpacity={0.8}>
          <Text style={styles.shareButtonText}>Share Results</Text>
          <ChevronRight size={24} color={COLORS.white} strokeWidth={3} />
        </TouchableOpacity>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconContainer}>
                <Text style={styles.menuIcon}>📋</Text>
              </View>
              <Text style={styles.menuItemText}>Tournament History</Text>
            </View>
            <ChevronRight size={20} color={COLORS.primary} strokeWidth={2.5} />
          </TouchableOpacity>

          {/* <View style={styles.menuDivider} /> */}

          {/* <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconContainer}>
                <Text style={styles.menuIcon}>🔔</Text>
              </View>
              <Text style={styles.menuItemText}>Notifications</Text>
            </View>
            <ChevronRight size={20} color={COLORS.primary} strokeWidth={2.5} />
          </TouchableOpacity> */}

          {/* <View style={styles.menuDivider} /> */}

          {/* <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconContainer}>
                <Text style={styles.menuIcon}>🔍</Text>
              </View>
              <Text style={styles.menuItemText}>My Details</Text>
            </View>
            <ChevronRight size={20} color={COLORS.primary} strokeWidth={2.5} />
          </TouchableOpacity> */}
        </View>
      </ScrollView>

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
