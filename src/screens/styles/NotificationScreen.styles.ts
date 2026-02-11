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
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...createBackgroundOverlay(),
  },
  title: {
    fontSize: RFValue(17),
    fontWeight: 'bold',
    color: COLORS.goldDark,
    bottom: wp(69),
    // ...createTextShadow(),
  },
  markAllButton: {
    position: 'absolute',
    top: hp(5),
    right: SPACING.md,
    padding: SPACING.sm,
    borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(255, 152, 0, 0.15)',
    borderWidth: 1,
    borderColor: COLORS.primary,
    zIndex: 100,
  },
  notificationBoardContainer: {
    width: wp(90),
    height: hp(75),
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationImage: {
    position: 'absolute',
    width: wp(120),
    height: hp(100),
  },
  notificationsWrapper: {
    position: 'absolute',
    width: wp(67.5),
    height: hp(58.5),
    borderRadius: RADIUS.md+8,
    top: hp(10.50),
    left: wp(11.25),
    overflow: 'hidden',
  },
  notificationsList: {
    flex: 1,
  },
  notificationsContent: {
    paddingVertical: SPACING.xs,
  },
  notificationItem: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: RADIUS.lg,
    padding: SPACING.sm,
    marginBottom: SPACING.md - SPACING.xs,
    // borderWidth: 1,
    // borderColor: COLORS.borderLight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreadNotification: {
    backgroundColor: 'rgba(255, 152, 0, 0.12)',
    borderColor: COLORS.primary,
    borderWidth: 0.2,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: RFValue(11),
    fontWeight: 'bold',
    color: COLORS.goldDark,
    marginBottom: hp(0.3),
  },
  notificationMessage: {
    fontSize: RFValue(9),
    color: COLORS.textSecondary,
    marginBottom: hp(0.3),
    lineHeight: RFValue(13),
  },
  notificationTime: {
    fontSize: RFValue(7),
    color: COLORS.textMuted,
    fontStyle: 'italic',
  },
  unreadDot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    backgroundColor: COLORS.primary,
    marginLeft: SPACING.sm,
  },
});
