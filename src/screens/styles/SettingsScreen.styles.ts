import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, SPACING, RADIUS, CARD_STYLES, createBackgroundOverlay } from '../../constants/theme';

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: { 
    flex: 1, 
    ...createBackgroundOverlay(),
    paddingHorizontal: SPACING.md + SPACING.sm,
    paddingTop: hp(8),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(8),
    top: hp(15.5),
    paddingHorizontal: SPACING.sm,
    left: wp(26),
    zIndex: 999
  },
  title: { 
    fontSize: RFValue(20), 
    fontWeight: 'bold',
    color: COLORS.goldDark,
    marginLeft: SPACING.sm,
  },
  settingsCard: {
    ...CARD_STYLES.base,
    borderWidth: 2,
    borderColor: COLORS.borderSecondary,
    shadowColor: COLORS.black,
    overflow: 'hidden',
  },
  settingsCardContainer: {
    position: 'relative',
    zIndex: 10,
  },
  settingsCardBackground: {
    width: '120%',
    height: hp(70),
    position: 'absolute',
    top: -60,
    left: -45,
  },
  settingsCardContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl + SPACING.md,
    zIndex: 15,
  },
  cardHeader: {
    paddingHorizontal: SPACING.md + SPACING.sm,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.cardBackgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderPrimary,
  },
  cardTitle: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: hp(0.5),
    left: wp(15)
  },
  cardSubtitle: {
    fontSize: RFValue(10),
    color: COLORS.textSecondary,
  },
  settingsList: {
    paddingHorizontal: SPACING.md + SPACING.sm,
    paddingVertical: SPACING.md,
  },
  settingItem: {
    top: wp(8),
    paddingVertical: SPACING.md - SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    zIndex: 20,
  },
  lastSettingItem: {
    borderBottomWidth: 0,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(4),
    zIndex: 25,
    top: 0,
    marginLeft: SPACING.sm,
    marginRight: SPACING.md,
  },
  settingIcon: {
    width: wp(12),
    height: wp(12),
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.cardBackgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  settingText: {
    flex: 1,
    marginRight: SPACING.sm,
    top: wp(0),
    left: wp(11),
  },
  settingTitle: {
    fontSize: RFValue(10),
    fontWeight: '600',
    color: COLORS.goldDark,
  },
  settingDescription: {
    fontSize: RFValue(8),
    color: COLORS.textSecondary,
    lineHeight: RFValue(16),
  },
  settingToggle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFooter: {
    paddingHorizontal: SPACING.md + SPACING.sm,
    paddingVertical: SPACING.xl,
    borderTopColor: COLORS.borderSecondary,
  },
  footerText: {
    fontSize: RFValue(10),
    color: COLORS.textMuted,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});