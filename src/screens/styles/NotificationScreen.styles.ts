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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundOverlay
  },
  title: {
    fontSize: RFValue(17),
    fontWeight: 'bold',
    color: '#7d511cff',
    bottom: wp(69),
    textShadowColor: COLORS.borderPrimary,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  markAllButton: {
    position: 'absolute',
    top: hp(5),
    right: wp(5),
    padding: wp(2),
    borderRadius: wp(2),
    backgroundColor: 'rgba(255, 152, 0, 0.15)',
    borderWidth: 1,
    borderColor: COLORS.primary,
    zIndex: 100,
    // shadowColor: COLORS.primary,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    // elevation: 5,
  },
  notificationBoardContainer: {
    width: wp(90),
    height: hp(75),
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationImage: {
    position: 'absolute',
    width: wp(120),
    height: hp(100),
  },
  notificationsWrapper: {
    position: 'absolute',
    width: wp(67.5),
    height: hp(58.5),
    borderRadius: 15,
    top: hp(10.50),
    left: wp(11.25),
    overflow: 'hidden',
  },
  notificationsList: {
    flex: 1,
  },
  notificationsContent: {
    paddingVertical: hp(1),
  },
  notificationItem: {
    backgroundColor: 'rgba(42, 42, 42, 0.85)',
    borderRadius: wp(3),
    padding: wp(3),
    marginBottom: hp(1.5),
    // borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreadNotification: {
    backgroundColor: 'rgba(255, 152, 0, 0.12)',
    borderColor: COLORS.primary,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: RFValue(11),
    fontWeight: 'bold',
    color: '#a76c23ff',
    marginBottom: hp(0.3),
  },
  notificationMessage: {
    fontSize: RFValue(9),
    color: 'rgba(134, 93, 32, 0.75)',
    marginBottom: hp(0.3),
    lineHeight: RFValue(13),
  },
  notificationTime: {
    fontSize: RFValue(7),
    color: COLORS.textMuted,
    fontStyle: 'italic',
  },
  unreadDot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    backgroundColor: COLORS.primary,
    marginLeft: wp(2),
  },
});
