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
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { styles } from './styles/LoginScreen.styles';
import CustomAlert from '../components/CustomAlert';
import { IMAGE_URL } from '../constants/image';

const { width } = Dimensions.get('window');

interface LoginScreenProps {
  onLogin: (walletAddress: string, referralCode?: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
  });

  // Animation values
  const frameScale = useRef(new Animated.Value(0.9)).current;
  const frameOpacity = useRef(new Animated.Value(0)).current;

  const emailAnim = useRef(new Animated.Value(20)).current;
  const emailOpacity = useRef(new Animated.Value(0)).current;

  const passAnim = useRef(new Animated.Value(20)).current;
  const passOpacity = useRef(new Animated.Value(0)).current;

  const forgotAnim = useRef(new Animated.Value(20)).current;
  const forgotOpacity = useRef(new Animated.Value(0)).current;

  const loginAnim = useRef(new Animated.Value(20)).current;
  const loginOpacity = useRef(new Animated.Value(0)).current;

  const googleAnim = useRef(new Animated.Value(20)).current;
  const googleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animation sequence
    Animated.sequence([
      // 1. Show Frame
      Animated.parallel([
        Animated.timing(frameOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(frameScale, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      // 2. Staggered children
      Animated.stagger(100, [
        Animated.parallel([
          Animated.timing(emailOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(emailAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(passOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(passAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(forgotOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(forgotAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(loginOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(loginAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(googleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(googleAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
        ]),
      ]),
    ]).start();
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
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
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
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1500));
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

  return (
    <ImageBackground
      source={{ uri: IMAGE_URL.LOGIN_BG }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Login Frame Container */}
            <Animated.View
              style={{
                opacity: frameOpacity,
                transform: [{ scale: frameScale }]
              }}
            >
              <ImageBackground
                source={{ uri: IMAGE_URL.LOGIN_FRAME }}
                style={styles.loginFrame}
                resizeMode="stretch"
              >
                <Text style={styles.title}>Login</Text>
                {/* Email Input */}
                <Animated.View style={{ opacity: emailOpacity, transform: [{ translateY: emailAnim }] }}>
                  <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                      <Mail color="#00d2ff" size={18} style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                      />
                    </View>
                  </View>
                </Animated.View>

                {/* Password Input */}
                <Animated.View style={{ opacity: passOpacity, transform: [{ translateY: passAnim }] }}>
                  <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                      <Lock color="#00d2ff" size={18} style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}
                        activeOpacity={0.7}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        {showPassword ? (
                          <EyeOff color="#00d2ff" size={19} />
                        ) : (
                          <Eye color="#00d2ff" size={19} />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </Animated.View>

                <Animated.View style={{ opacity: forgotOpacity, transform: [{ translateY: forgotAnim }] }}>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </Animated.View>

                {/* Login Button */}
                <Animated.View style={{ opacity: loginOpacity, transform: [{ translateY: loginAnim }] }}>
                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                    disabled={isLoading}
                  >
                    <LinearGradient
                      colors={['#ffcc00', '#ff8c00', '#e67300']}
                      style={styles.buttonGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                    >
                      <Text style={styles.loginButtonText}>
                        {isLoading ? 'Loading...' : 'Login'}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </Animated.View>

                {/* Google Login Button */}
                <Animated.View style={{ opacity: googleOpacity, transform: [{ translateY: googleAnim }] }}>
                  <TouchableOpacity
                    style={styles.googleButton}
                    onPress={handleGoogleLogin}
                    disabled={isLoading}
                  >
                    <LinearGradient
                      colors={['#4a90e2', '#357abd', '#2a5f9e']}
                      style={styles.buttonGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                    >
                      <Text style={styles.googleButtonText}>
                        {isLoading ? 'Loading...' : 'Google'}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </Animated.View>
              </ImageBackground>
            </Animated.View>
          </View>

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
    </ImageBackground>
  );
}
