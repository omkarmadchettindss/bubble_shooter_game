import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../../constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    opacity: 0.9
  },
  container: {
    flex: 1,
    paddingTop: hp(5),
    backgroundColor: 'rgba(11, 11, 11, 0.95)',
  },
  dailyRewardTagContainer: {
    alignItems: 'center',
    marginTop: hp(2),
    marginBottom: hp(-5),
    zIndex: 10,
  },
  dailyRewardTag: {
    width: wp(90),
    height: hp(15),
  },
  backButton: {
    position: 'absolute',
    top: hp(6),
    left: wp(3),
    zIndex: 20,
  },
  backButtonCircle: {
    width: wp(15),
    height: wp(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonIcon: {
    width: wp(110),
    height: wp(20),
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(0),
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: hp(10),
  },
  rewardsGrid: {
    width: '100%',
    alignItems: 'center',
  },
  rewardRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: wp(90),
    marginBottom: hp(-8),
  },
  rewardItem: {
    width: wp(40),
    height: hp(25),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(2),
  },
  rewardImage: {
    width: wp(42),
    height: hp(20),
  },
  day7RewardItem: {
    width: wp(50),
    height: hp(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(2),
    
  },
  day7RewardImage: {
    width: wp(60),
    height: hp(28),
    bottom: hp(6)
  },
  dayText: {
    color: '#ffffff',
    fontSize: RFValue(14),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp(-4),
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  day5Text: {
    color: '#ffffff',
    fontSize: RFValue(14),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp(-3.5),
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  day6Text: {
    color: '#ffffff',
    fontSize: RFValue(14),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp(-3.5),
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  day7Text: {
    color: '#ffffff',
    fontSize: RFValue(14),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp(-13),
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  disabledRewardItem: {
    opacity: 1,
  },
  disabledRewardImage: {
    opacity: 0.7,
  },
  disabledDayText: {
    opacity: 1,
    color: '#888888',
  },
});