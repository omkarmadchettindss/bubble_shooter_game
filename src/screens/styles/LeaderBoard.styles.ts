import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: { 
    flex: 1, 
    paddingTop: hp(8),
    paddingBottom: hp(6),
    paddingHorizontal: 20,
    backgroundColor: 'rgba(11, 11, 11, 0.7)',
  },
  
  // Top Players Section
  topPlayersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  topPlayerCard: {
    alignItems: 'center',
    marginHorizontal: 8,
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
    borderColor: '#FFD700',
    marginBottom: 8,
    // gap: 8
  },
  topRankBadge: {
    width: wp(7),
    height: hp(7),
    top: wp(8),
    left: wp(7)
  },
  avatarEmoji: {
    fontSize: RFValue(25),
  },
  crownBadge: {
    position: 'absolute',
    top: -18,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crownIcon: {
    fontSize: RFValue(12),
  },
  topPlayerName: {
    fontSize: RFValue(7),
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 4,
  },
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  coinIcon: {
    fontSize: RFValue(10),
    // marginRight: 0,
  },
  bottomCoinIcon: {
    fontSize: RFValue(10),
    marginRight: -25,
  },
  coinAmount: {
    fontSize: RFValue(8),
    fontWeight: 'bold',
    color: '#FFD700',
  },

  // Header Row
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#7C3AED',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: RFValue(9),
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'center',
  },

  // Leaderboard List
  listContainer: {
    paddingBottom: 100,
  },
  leaderboardRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 16,
    paddingHorizontal: 20,
    // borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tableCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  playerCell: {
    gap: 8,
    flex: 1,
    paddingHorizontal: 10,
  },
  rankText: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    minWidth: wp(10),
  },
  rankBadge: {
    width: wp(10),
    height: hp(5),
  },
  rankTextTop: {
    color: '#7C3AED',
  },
  avatarSmall: {
    fontSize: RFValue(15),
  },
  playerName: {
    fontSize: RFValue(8),
    fontWeight: '600',
    color: '#333',
    textAlign: 'left',
  },
  coinText: {
    fontSize: RFValue(9),
    fontWeight: 'bold',
    color: '#F59E0B',
    textAlign: 'right',
    width: 60,
  },

  // Enter Button
  enterButton: {
    position: 'absolute',
    bottom: hp(20),
    left: 20,
    right: 20,
    backgroundColor: '#7C3AED',
    paddingVertical: 18,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  enterButtonText: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: 8,
  },
  arrowIcon: {
    fontSize: RFValue(16),
    color: '#FFF',
  },
});