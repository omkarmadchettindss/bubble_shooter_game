import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: wp(8),
    paddingVertical: hp(4),
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: hp(1),
    textShadowColor: COLORS.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: RFValue(10),
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: hp(4),
    fontStyle: 'italic',
  },
  decorativeContainer: {
    position: 'relative',
    height: hp(8),
    marginBottom: hp(4),
  },
  bubble: {
    position: 'absolute',
    fontSize: RFValue(30),
    left: wp(20),
    top: hp(2),
  },
  bubble2: {
    left: wp(50),
    top: hp(0),
    fontSize: RFValue(25),
  },
  bubble3: {
    left: wp(70),
    top: hp(3),
    fontSize: RFValue(35),
  },
  inputContainer: {
    marginBottom: hp(3),
  },
  label: {
    fontSize: RFValue(10),
    color: COLORS.textPrimary,
    marginBottom: hp(1),
    fontWeight: '600',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: wp(4),
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    fontSize: RFValue(10),
    color: COLORS.textPrimary,
    minHeight: hp(6),
    shadowColor: COLORS.primary,
  },
  inputGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: COLORS.borderPrimary,
    opacity: 0.5,
    pointerEvents: 'none', // Allow touches to pass through
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
    marginBottom: hp(4),
    gap: wp(4), // Space between buttons
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: wp(4),
    paddingVertical: hp(2.5),
    flex: 1, // Take equal space
    position: 'relative',
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  loginButtonDisabled: {
    backgroundColor: '#444',
    borderColor: '#666',
  },
  googleButton: {
    backgroundColor: '#4285f4',
    borderRadius: wp(4),
    paddingVertical: hp(2.5),
    flex: 1, // Take equal space
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#4285f4',
    borderWidth: 2,
    borderColor: '#4285f4',
  },
  googleButtonText: {
    color: COLORS.textPrimary,
    fontSize: RFValue(12),
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: COLORS.shadowPrimary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIcon: {
    fontSize: RFValue(12),
    marginRight: wp(2),
    color: COLORS.textPrimary,
  },
  loginButtonText: {
    color: COLORS.textPrimary,
    fontSize: RFValue(12),
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: COLORS.shadowPrimary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: wp(4),
    backgroundColor: COLORS.borderSecondary,
    opacity: 0,
  },
  buttonGlowActive: {
    opacity: 1,
  },
  disclaimer: {
    fontSize: RFValue(11),
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: RFValue(16),
    fontStyle: 'italic',
  },
});