import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, SPACING, RADIUS, createBackgroundOverlay, createTextShadow } from '../../constants/theme';

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  coinText: {
    position: 'absolute',
    left: wp(16),
    top: wp(8.2),
    fontSize: RFValue(15),
    fontWeight: 'bold',
    color: COLORS.gold,
    ...createTextShadow(),
  },
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    ...createBackgroundOverlay(),
    paddingHorizontal: SPACING.sm,
  },
  walletContainer: {
    position: 'absolute',
    top: hp(6),
    left: wp(4),
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.borderPrimary,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  userIcon: {
    marginRight: SPACING.xs,
    top: wp(0.5)
  },
  walletAddressTopLeft: {
    fontSize: RFValue(10),
    color: COLORS.primary,
    fontFamily: 'monospace',
    maxWidth: wp(40),
  },
  coinContainer: {
    position: 'absolute',
    top: hp(3),
    left: wp(1),
  },
  coinButton: {
    padding: SPACING.xs,
  },
  coinImage: {
    width: wp(35),
    height: wp(22),
  },
  dailyRewardContainer: {
    position: 'absolute',
    top: hp(11),
    left: wp(-2),
  },
  dailyRewardButton: {
    padding: SPACING.xs,
  },
  dailyRewardImage: {
    width: wp(30),
    height: wp(25),
  },
  notificationContainer: {
    position: 'absolute',
    top: hp(6),
    right: wp(17),
  },
  notificationButton: {
    padding: SPACING.sm,
  },
  notificationIcon: {
    width: wp(12),
    height: wp(10),
    right: wp(-5),
    bottom: wp(2)
  },
  infoContainer: {
    position: 'absolute',
    top: hp(5),
    right: wp(1),
  },
  infoButton: {
    padding: SPACING.sm,
  },
  infoIcon: {
    width: wp(20),
    height: wp(15),
    right: wp(-5),
    bottom: wp(2)
  },
  dailyChallengeContainer: {
    position: 'absolute',
    top: hp(11),
    right: wp(-2),
  },
  dailyChallengeButton: {
    padding: SPACING.xs,
  },
  dailyChallengeImage: {
    width: wp(30),
    height: wp(22),
  },
  title: { 
    fontSize: RFValue(24), 
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    ...createTextShadow(),
  },
  walletText: {
    fontSize: RFValue(14),
    color: COLORS.textMuted,
    marginBottom: SPACING.xs,
  },
  walletAddress: {
    fontSize: RFValue(12),
    color: COLORS.primary,
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: SPACING.lg,
    paddingHorizontal: wp(4),
  },
  subtitle: {
    fontSize: RFValue(16),
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  promoBannerContainer: {
    alignItems: 'center',
    marginVertical: SPACING.md,
    bottom: wp(-28),
  },
  promoBannerFrame: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: RADIUS.lg,
    padding: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.borderPrimary,
  },
  promoBannerButton: {
    position: 'relative',
    borderRadius: RADIUS.md,
    overflow: 'hidden',
  },
  promoBannerImage: {
    width: wp(65),
    height: wp(43),
    borderRadius: RADIUS.md,
    opacity: 0.7
  },
  promoBadge: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,      // Re-enabled background
    paddingHorizontal: SPACING.xs + 2,  // Adjusted for icon
    paddingVertical: SPACING.xs + 2,    // Adjusted for icon
    borderRadius: RADIUS.sm,
    borderWidth: 0.3,                      // Increased border
    borderColor: COLORS.goldDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoBadgeText: {
    fontSize: RFValue(5),
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 0.4,
  },
  playButton: {
    width: wp(50),
    height: wp(20),
    position: 'absolute',
    bottom: hp(18),
    alignSelf: 'center',
  },
  playButtonImage: {
    width: wp(50),
    height: wp(30),
  },
});