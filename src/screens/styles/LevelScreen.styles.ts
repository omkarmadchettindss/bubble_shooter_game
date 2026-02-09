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
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundOverlay,
  },
  header: {
    paddingTop: hp(5),
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: wp(12),
    height: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
    left: wp(80)
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
    color: '#dca91dff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    zIndex: 1,
  },
  levelMapContainer: {
    flex: 1,
  },
  levelMapContent: {
    paddingVertical: hp(2),
    paddingBottom: hp(10),
    minHeight: hp(180),
  },
  pathContainer: {
    width: '100%',
    height: hp(175),
    position: 'relative',
    bottom: wp(-20),
    top: wp(-10)
    // REMOVED: top: wp(-30) - This was hiding level 1
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
    backgroundColor: '#666',
    borderRadius: wp(10),
    top: wp(2.5),
    width: wp(15),
    height: wp(15),
    borderWidth: 2,
    borderColor: '#888',
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
    // textShadowColor: 'rgba(0, 0, 0, 0.5)',
    // textShadowOffset: { width: 0, height: 2 },
    // textShadowRadius: 3,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: wp(1),
    marginTop: hp(0.5),
    position: 'absolute',
    bottom: wp(-0.2),
  },
  specialLevelBadge: {
    position: 'absolute',
    top: -hp(1.5),
    backgroundColor: COLORS.error,
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: COLORS.white,
    right: wp(6),
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.4,
    // shadowRadius: 3,
    // elevation: 4,
  },
  specialLevelText: {
    fontSize: RFValue(8),
    fontWeight: 'bold',
    color: COLORS.white,
  },
});