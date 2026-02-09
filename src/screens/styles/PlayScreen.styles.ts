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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backButton: {
    position: 'absolute',
    top: hp(5.1),
    left: wp(84),
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
    paddingHorizontal: wp(8),
  },
  levelTitle: {
    fontSize: RFValue(32),
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: hp(2),
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  comingSoon: {
    fontSize: RFValue(18),
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: hp(1),
    fontWeight: '600',
  },
  subtitle: {
    fontSize: RFValue(14),
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
