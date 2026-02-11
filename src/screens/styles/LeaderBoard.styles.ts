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

  // Leaderboard Frame
  leaderboardFrame: {
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.sm,
    right: wp(9),
    width: wp(105),
    height: hp(80),              // Keep your height
    bottom: hp(12),
    minHeight: hp(40),
  },

  // Header Row
  headerRow: {
    flexDirection: 'row',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    justifyContent: 'space-between',
    top: hp(10.5),
    // top: hp(20)
    marginBottom: SPACING.xs,
  },
  headerTextName: {
    fontSize: RFValue(11),
    fontWeight: 'bold',
    color: COLORS.goldDark,
    textAlign: 'center',
    flex: 1,
  },
  headerTextRank: {
    fontSize: RFValue(11),
    left: wp(5),
    fontWeight: 'bold',
    color: COLORS.goldDark,
    textAlign: 'center',
    flex: 1,
  },
  headerTextPoints: {
    fontSize: RFValue(11),
    right: wp(5),
    fontWeight: 'bold',
    color: COLORS.goldDark,
    textAlign: 'center',
    flex: 1,
  },

  // Leaderboard List
  listContainer: {
    paddingHorizontal: SPACING.lg + 8,
    bottom: 25,
    // backgroundColor: '#eee',
    borderRadius: wp(10),
  },
  leaderboardRowBg: {
    marginBottom: -hp(4.5),    // Fixed: was negative value
    overflow: 'hidden',
    height: hp(12),
  },
  leaderboardRow: {
    flexDirection: 'row',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: -31,
  },
  scrollableList: {
    maxHeight: hp(60),
    marginTop: hp(11),
    marginBottom: hp(11),
  },
  tableCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    top: wp(2.5),
  },
  rankText: {
    fontSize: RFValue(10),
    fontWeight: 'bold',
    color: COLORS.goldDark,
    textAlign: 'center',
  },
  rankTextTop: {
    color: COLORS.primary,
  },
  playerName: {
    fontSize: RFValue(9),
    fontWeight: 'bold',
    color: COLORS.goldDark,
    textAlign: 'center',
  },
  coinText: {
    fontSize: RFValue(9),
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    textAlign: 'center',
  },
});