import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, SPACING, RADIUS, createBackgroundOverlay } from '../../constants/theme';

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: { 
    flex: 1, 
    ...createBackgroundOverlay(),
  },
  header: {
    paddingTop: hp(6),
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: RFValue(18),
    left: wp(12),
    top: hp(16.8),
    zIndex: 999,
    fontWeight: 'bold',
    color: '#eee',
    flex: 1,
    textAlign: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    position: 'relative',
  },
  settingsButton: {
    padding: SPACING.xs,
  },
  settingsIcon: {
    width: wp(12),
    height: wp(12),
    left: wp(3)
  },
  menuButton: {
    padding: SPACING.sm,
    backgroundColor: COLORS.cardBackground,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    left: wp(2),
    borderColor: COLORS.borderLight,
  },
  dropdownMenu: {
    position: 'absolute',
    top: hp(6),
    right: 0,
    backgroundColor: COLORS.cardBackground,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    minWidth: wp(40),
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md - SPACING.xs,
    gap: SPACING.sm,
  },
  dropdownItemText: {
    fontSize: RFValue(12),
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginHorizontal: SPACING.sm,
  },
  profileSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowEffect: {
    position: 'absolute',
    width: wp(92),
    height: wp(52),
    backgroundColor: 'rgba(30, 150, 255, 0.4)',
    borderRadius: RADIUS.xl,
    shadowColor: '#1E96FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 10,
  },
  profileFrame: {
    width: wp(150),
    height: wp(150),
    bottom: wp(10),
  },
  profileContent: {
    position: 'absolute',
    width: wp(73),
    height: wp(25),
    top: hp(8),
    backgroundColor: 'rgba(30, 100, 180, 0.85)',
    borderRadius: RADIUS.lg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImageContainer: {
    width: wp(22),
    height: wp(22),
    left: -wp(1.5),
    backgroundColor: COLORS.cardBackground,
    borderRadius: RADIUS.md,
    borderWidth: 3,
    borderColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  profileImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: RADIUS.sm,
  },
  editIconButton: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: COLORS.info,
    borderRadius: wp(4),
    width: wp(5),
    height: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  editIconText: {
    fontSize: RFValue(6),
  },
  profileStats: {
    flex: 1,
  },
  profileName: {
    fontSize: RFValue(9),
    fontWeight: 'bold',
    color: COLORS.gold,
    marginBottom: SPACING.xs,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  statIcon: {
    marginRight: SPACING.xs,
  },
  statText: {
    fontSize: RFValue(8),
    color: COLORS.white,
    fontWeight: '500',
  },
  profileRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  vipBadge: {
    width: wp(18),
    height: wp(18),
  },
});
