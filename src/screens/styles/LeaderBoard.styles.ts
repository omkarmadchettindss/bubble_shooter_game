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
    paddingTop: hp(8),
    paddingBottom: hp(6),
    paddingHorizontal: SPACING.md,
    ...createBackgroundOverlay(),
  },

  // Top Players Section
  topPlayersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.sm,
  },
  topPlayerCard: {
    alignItems: 'center',
    marginHorizontal: SPACING.sm,
    width: wp(27),
  },
  topPlayerCardCenter: {
    transform: [{ scale: 1.2 }],
    bottom: 20,
  },
  avatarContainer: {
    width: wp(20),
    height: hp(9),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gold,
    marginBottom: SPACING.sm,
  },
  topRankBadge: {
    width: wp(7),
    height: hp(7),
    top: wp(8),
    left: wp(7)
  },
  topPlayerName: {
    fontSize: RFValue(7),
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.md,
  },
  coinIcon: {
    fontSize: RFValue(10),
  },
  bottomCoinIcon: {
    fontSize: RFValue(10),
    marginRight: 5,
  },
  coinAmount: {
    fontSize: RFValue(8),
    fontWeight: 'bold',
    color: COLORS.gold,
  },

  // Leaderboard Frame Container - FIXED
  leaderboardFrameContainer: {
    flex: 1,
    marginHorizontal: SPACING.md,
    bottom: hp(8),
    right: wp(6),
    height: hp(110),
    width: wp(100)
  },

  // Leaderboard Frame - FIXED
  leaderboardFrame: {
    flex: 1,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.sm,
    overflow: 'hidden', // Important: keeps content within bounds
    height: hp(75)
  },

  // Header Row
  headerRow: {
    flexDirection: 'row',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    justifyContent: 'space-between',
    top: hp(7.6)
  },
  headerTextName: {
    fontSize: RFValue(11),
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    flex: 1,
  },
  headerTextRank: {
    fontSize: RFValue(11),
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    flex: 1,
    left: wp(5)
  },
  headerTextPoints: {
    fontSize: RFValue(11),
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    flex: 1,
    right: wp(5)
  },

  // Leaderboard List - FIXED SPACING
  scrollableList: {
    flex: 1,
    top: hp(7.2),
    bottom: hp(9),
    maxHeight: hp(43),
  },
  listContainer: {
    // backgroundColor: '#eee',
    paddingHorizontal: SPACING.sm,
    paddingBottom: SPACING.lg,
  },
  leaderboardRowBg: {
    overflow: 'hidden',
    height: hp(25), // Reduced from hp(25) for proper sizing
    width: wp(80),
    left: wp(6.7),
    top: hp(10),
    marginTop: -wp(42)
  },
  leaderboardRow: {
    flexDirection: 'row',
    paddingVertical: hp(1.5),
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  tableCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    bottom: wp(0.5)
  },
  rankText: {
    fontSize: RFValue(10),
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  rankTextTop: {
    color: COLORS.primary,
  },
  playerName: {
    fontSize: RFValue(9),
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  coinText: {
    fontSize: RFValue(9),
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    textAlign: 'center',
  },
});