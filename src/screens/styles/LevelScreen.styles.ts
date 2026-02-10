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
    ...createBackgroundOverlay(),
  },
  header: {
    paddingTop: hp(5),
    paddingHorizontal: SPACING.xs,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: wp(12),
    height: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
    left: wp(83.3)
  },
  backButtonIcon: {
    width: wp(25),
    height: wp(20),
  },
  coinContainer: {
    alignItems: 'center',
    right: wp(60)
  },
  coinButton: {
    position: 'relative',
    width: wp(40),
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  coinText: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    left: wp(3),
    bottom: hp(0.2),
    color: COLORS.gold,
    ...createTextShadow(),
    zIndex: 1,
  },
  levelMapContainer: {
    flex: 1,
  },
  levelMapContent: {
    paddingVertical: SPACING.md,
    paddingBottom: hp(10),
    minHeight: hp(180),
  },
  pathContainer: {
    width: '100%',
    height: hp(175),
    position: 'relative',
    bottom: wp(-20),
    top: wp(-10)
  },
  snakePath: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  levelNodeWrapper: {
    width: wp(20),
    height: wp(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelNodeTouchable: {
    width: '100%',
    height: '100%',
  },
  levelNode: {
    width: wp(20),
    height: wp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelNodeLocked: {
    backgroundColor: COLORS.cardBackgroundLight,
    borderRadius: wp(10),
    top: wp(2.5),
    width: wp(15),
    height: wp(15),
    borderWidth: 2,
    borderColor: COLORS.borderLight,
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedIcon: {
    fontSize: RFValue(12)
  },
  levelNumber: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: '#201f1fae',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginTop: hp(0.5),
    position: 'absolute',
    bottom: wp(-0.2),
  },
  specialLevelBadge: {
    position: 'absolute',
    top: -hp(1.5),
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.sm,
    paddingVertical: hp(0.5),
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.white,
    right: wp(6),
  },
  specialLevelText: {
    fontSize: RFValue(8),
    fontWeight: 'bold',
    color: COLORS.white,
  },
});