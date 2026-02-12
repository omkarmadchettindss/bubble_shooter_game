import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, SPACING, createBackgroundOverlay, createTextShadow } from '../../constants/theme';

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    ...createBackgroundOverlay(),
  },
  progressBarContainer: {
    position: 'absolute',
    top: hp(5),
    left: wp(5),
    right: wp(20),
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 5,
  },
  progressBarBackground: {
    flex: 1,
    height: hp(3),
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: hp(1.5),
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: hp(1.5),
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  progressText: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginLeft: wp(2),
    minWidth: wp(12),
    textAlign: 'center',
    ...createTextShadow(),
  },
  backButton: {
    position: 'absolute',
    top: hp(5.3),
    left: wp(84.2),
    width: wp(12),
    height: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  backButtonIcon: {
    width: wp(25),
    height: wp(20),
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  levelTitle: {
    fontSize: RFValue(32),
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SPACING.md,
    ...createTextShadow(),
  },
  comingSoon: {
    fontSize: RFValue(18),
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: RFValue(14),
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
