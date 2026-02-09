import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { styles } from './styles/LoginScreen.styles';
import CustomAlert from '../components/CustomAlert';

const { width } = Dimensions.get('window');

interface LoginScreenProps {
  onLogin: (walletAddress: string, referralCode?: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
  });

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Start continuous pulse animation for title
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    // Start continuous rotation for loading
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );
    rotateAnimation.start();
  }, []);

  const handleLogin = async () => {
    if (!email.trim()) {
      setAlertConfig({
        visible: true,
        title: 'Error',
        message: 'Please enter your email address',
      });
      return;
    }

    if (!password.trim()) {
      setAlertConfig({
        visible: true,
        title: 'Error',
        message: 'Please enter your password',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate login process
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
      
      // Call the onLogin callback with email as wallet address for now
      onLogin(email.trim(), undefined);
    } catch (error) {
      setAlertConfig({
        visible: true,
        title: 'Error',
        message: 'Login failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      // Simulate Google login process
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1500));
      
      // Call the onLogin callback with a mock Google email
      onLogin('google.user@gmail.com', undefined);
    } catch (error) {
      setAlertConfig({
        visible: true,
        title: 'Error',
        message: 'Google login failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          {/* Animated Title */}
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <Text style={styles.title}>BUBBLE SHOOTER</Text>
          </Animated.View>
          
          <Text style={styles.subtitle}>Sign in to start playing!</Text>

          {/* Animated Decorative Elements */}
          <View style={styles.decorativeContainer}>
            <Animated.Text style={[styles.bubble, { transform: [{ rotate: spin }] }]}>
              🔵
            </Animated.Text>
            <Animated.Text style={[styles.bubble, styles.bubble2, { transform: [{ rotate: spin }] }]}>
              🟡
            </Animated.Text>
            <Animated.Text style={[styles.bubble, styles.bubble3, { transform: [{ rotate: spin }] }]}>
              🔴
            </Animated.Text>
          </View>

          {/* Input Fields with Game-like Styling */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>� Email  Address *</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                multiline={false}
              />
              <View style={styles.inputGlow} />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>🔒 Password *</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                multiline={false}
              />
              <View style={styles.inputGlow} />
            </View>
          </View>

          {/* Buttons Container - Side by Side */}
          <View style={styles.buttonsContainer}>
            {/* Login Button */}
            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <View style={styles.buttonContent}>
                {/* {isLoading && (
                  <Animated.Text style={[styles.loadingIcon, { transform: [{ rotate: spin }] }]}>
                    ⚡
                  </Animated.Text>
                )} */}
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'SIGNING IN...' : 'LOGIN'}
                </Text>
              </View>
              <View style={[styles.buttonGlow, isLoading && styles.buttonGlowActive]} />
            </TouchableOpacity>

            {/* Google Login Button */}
            <TouchableOpacity
              style={[styles.googleButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleGoogleLogin}
              disabled={isLoading}
            >
              <View style={styles.buttonContent}>
                {/* {isLoading && (
                  <Animated.Text style={[styles.loadingIcon, { transform: [{ rotate: spin }] }]}>
                    ⚡
                  </Animated.Text>
                )} */}
                <Text style={styles.googleButtonText}>
                  {isLoading ? 'CONNECTING...' : 'GOOGLE'}
                </Text>
              </View>
              <View style={[styles.buttonGlow, isLoading && styles.buttonGlowActive]} />
            </TouchableOpacity>
          </View>

          <Text style={styles.disclaimer}>
            🛡️ By signing in, you agree to our terms of service and privacy policy.
          </Text>
        </Animated.View>

        {/* Custom Alert */}
        <CustomAlert
          visible={alertConfig.visible}
          title={alertConfig.title}
          message={alertConfig.message}
          buttons={[{ text: 'OK', style: 'default' }]}
          onClose={() => setAlertConfig({ ...alertConfig, visible: false })}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}