import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  buttons: Array<{
    text: string;
    style?: 'default' | 'cancel' | 'destructive';
    onPress?: () => void;
  }>;
  onClose: () => void;
}

export default function CustomAlert({
  visible,
  title,
  message,
  buttons,
  onClose,
}: CustomAlertProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Show animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
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
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleButtonPress = (button: any) => {
    if (button.onPress) {
      button.onPress();
    }
    onClose();
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
            styles.alertContainer,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Alert Content */}
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>{title}</Text>
            <Text style={styles.alertMessage}>{message}</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  button.style === 'destructive' && styles.destructiveButton,
                  button.style === 'cancel' && styles.cancelButton,
                  buttons.length === 1 && styles.singleButton,
                ]}
                onPress={() => handleButtonPress(button)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    button.style === 'destructive' && styles.destructiveButtonText,
                    button.style === 'cancel' && styles.cancelButtonText,
                  ]}
                >
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = {
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayTouch: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  alertContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: wp(4),
    marginHorizontal: wp(8),
    maxWidth: wp(80),
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  alertContent: {
    padding: wp(6),
    paddingBottom: wp(4),
  },
  alertTitle: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: hp(2),
  },
  alertMessage: {
    fontSize: RFValue(14),
    color: '#ccc',
    textAlign: 'center',
    lineHeight: RFValue(20),
  },
  buttonsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  button: {
    flex: 1,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff9800',
    borderRightWidth: 1,
    borderRightColor: '#333',
  },
  singleButton: {
    borderRightWidth: 0,
    borderBottomLeftRadius: wp(4),
    borderBottomRightRadius: wp(4),
  },
  cancelButton: {
    backgroundColor: '#666',
    borderBottomLeftRadius: wp(4),
  },
  destructiveButton: {
    backgroundColor: '#dc3545',
    borderBottomRightRadius: wp(4),
  },
  buttonText: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: '#fff',
  },
  cancelButtonText: {
    color: '#fff',
  },
  destructiveButtonText: {
    color: '#fff',
  },
} as const;