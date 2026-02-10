import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Home from '../screens/HomeScreen';
import LeaderBoard from '../screens/LeaderBoard';
import Profile from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';

import { IMAGE_URL } from '../constants/image';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

const Tab = createBottomTabNavigator();

interface BottomTabsProps {
  userWallet: string;
  userReferralCode: string;
  onLogout: () => void;
}

export default function BottomTabs({ userWallet, userReferralCode, onLogout }: BottomTabsProps) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: hp(8),
          paddingBottom: SPACING.md,
          backgroundColor: COLORS.backgroundDark,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          position: 'absolute',
          borderRadius: RADIUS.lg + 25,
          marginHorizontal: SPACING.xs,
          left: SPACING.xs,
          right: SPACING.xs,
          bottom: SPACING.md,
        },
        tabBarLabelStyle: {
          fontSize: RFValue(11),
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,

        tabBarIcon: ({ focused }) => {
          let iconSource;

          switch (route.name) {
            case 'Home':
              iconSource = { uri: IMAGE_URL.HOME_BUTTON };
              break;
            case 'LeaderBoard':
              iconSource = { uri: IMAGE_URL.LEADRBOARD_BUTTON };
              break;
            case 'Notifications':
              iconSource = { uri: IMAGE_URL.NOTIFICATION };
              break;
            case 'Profile':
              iconSource = { uri: IMAGE_URL.PROFILE_BUTTON };
              break;

            default:
              return <View style={styles.placeholderIcon} />;
          }

          return (
            <Image
              source={iconSource}
              style={[
                styles.tabIcon,
                { opacity: focused ? 1 : 0.5 },
              ]}
              resizeMode="contain"
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home">
        {props => <Home {...props} userWallet={userWallet} />}
      </Tab.Screen>
      <Tab.Screen name="LeaderBoard" component={LeaderBoard} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="Profile">
        {props => (
          <Profile
            {...props}
            userWallet={userWallet}
            userReferralCode={userReferralCode}
            onLogout={onLogout}
          />
        )}
      </Tab.Screen>

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: wp(25),
    height: hp(5.5),
    top: wp(5)
  },
  placeholderIcon: {
    width: wp(8),
    height: hp(3.5),
  },
});
