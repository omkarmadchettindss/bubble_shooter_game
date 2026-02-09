import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import LevelScreen from '../screens/LevelScreen';
import PlayScreen from '../screens/PlayScreen';
import DailyRewardScreen from '../screens/DailyRewardScreen';
import BottomTabs from './BottomTabs';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userWallet, setUserWallet] = useState<string>('');
  const [userReferralCode, setUserReferralCode] = useState<string>('');

  const handleLogin = (walletAddress: string, referralCode?: string) => {
    setUserWallet(walletAddress);
    setUserReferralCode(referralCode || '');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserWallet('');
    setUserReferralCode('');
  };

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        animationEnabled: false,
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: {
            opacity: current.progress,
          },
        }),
      }}
    >
      {!isLoggedIn ? (
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} onLogin={handleLogin} />}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="Main">
            {props => (
              <BottomTabs 
                {...props} 
                userWallet={userWallet}
                userReferralCode={userReferralCode}
                onLogout={handleLogout}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Level" component={LevelScreen} />
          <Stack.Screen name="Play" component={PlayScreen} />
          <Stack.Screen name="DailyReward" component={DailyRewardScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}