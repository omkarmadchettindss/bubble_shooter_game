import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  coinText: {
    position: 'absolute',
    left: wp(16),       // adjust based on design
    top: wp(8.2),
    fontSize: RFValue(15),
    fontWeight: 'bold',
    color: '#dca91dff',   // or white depending on bg
  },
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: COLORS.backgroundOverlay,
    paddingHorizontal: wp(8),
  },
  walletContainer: {
    position: 'absolute',
    top: hp(6),
    left: wp(4),
    backgroundColor: COLORS.gameOverlayDark,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: COLORS.borderPrimary,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  userIcon: {
    marginRight: wp(1),
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
    top: hp(3), // Position below email container
    left: wp(1),
  },
  coinButton: {
    padding: wp(1),
  },
  coinImage: {
    width: wp(35),
    height: wp(22),
  },
  dailyRewardContainer: {
    position: 'absolute',
    top: hp(11), // Position below coin container
    left: wp(-2),
  },
  dailyRewardButton: {
    padding: wp(1),
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
    padding: wp(2),
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
    padding: wp(2),
  },
  infoIcon: {
    width: wp(20),
    height: wp(15),
    right: wp(-5),
    bottom: wp(2)
  },
  dailyChallengeContainer: {
    position: 'absolute',
    top: hp(11), // Position below notification and info buttons
    right: wp(-2),
  },
  dailyChallengeButton: {
    padding: wp(1),
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
    marginBottom: hp(3),
  },
  walletText: {
    fontSize: RFValue(14),
    color: COLORS.textMuted,
    marginBottom: hp(1),
  },
  walletAddress: {
    fontSize: RFValue(12),
    color: COLORS.primary,
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: hp(3),
    paddingHorizontal: wp(4),
  },
  subtitle: {
    fontSize: RFValue(16),
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  promoBannerContainer: {
    alignItems: 'center',
    marginVertical: hp(2),
    bottom: wp(-28),
    opacity: 0.7
  },
  promoBannerButton: {
    padding: wp(1),
  },
  promoBannerImage: {
    width: wp(65),
    height: wp(43),
    borderRadius: wp(2),
  },
  playButton: {
    width: wp(50),
    height: wp(20),
    position: 'absolute',
    bottom: hp(18), // Position above bottom navigation
    alignSelf: 'center',
  },
  playButtonImage: {
    width: wp(50),
    height: wp(30),
  },
});