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
    paddingHorizontal: wp(6),
    paddingTop: hp(8),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(8),
    top: hp(15.5),
    paddingHorizontal: wp(2),
    left: wp(26),
    zIndex: 999
  },
  title: { 
    fontSize: RFValue(20), 
    fontWeight: 'bold',
    color: '#7d511cff',
    marginLeft: wp(3),
  },
  settingsCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: wp(6),
    borderWidth: 2,
    borderColor: COLORS.borderSecondary,
    shadowColor: COLORS.shadowPrimary,
    overflow: 'hidden',
  },
  settingsCardContainer: {
    position: 'relative',
    zIndex: 10,
    // elevation: 10,
  },
  settingsCardBackground: {
    width: '120%',
    height: hp(70),
    position: 'absolute',
    top: -60,
    left: -45,
  },
  settingsCardContent: {
    paddingHorizontal: wp(8),
    paddingVertical: hp(6),
    zIndex: 15,
    // elevation: 15,
  },
  cardHeader: {
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
    backgroundColor: COLORS.gameAccentLight,
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
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
  },
  settingItem: {
    top: wp(8),
    paddingVertical: hp(1.49),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 20,
    // elevation: 20,
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
    marginLeft: wp(2),
    marginRight: wp(4),
    // backgroundColor: '#000000ff'
    // elevation: 25,
  },
  settingIcon: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: COLORS.gameOverlayLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(4),
  },
  settingText: {
    flex: 1,
    marginRight: wp(3),
    top: wp(0),
    left: wp(11),
  },
  settingTitle: {
    fontSize: RFValue(10),
    fontWeight: '600',
    // color: COLORS.textPrimary,
    color: '#dc8a25ff',
    // backgroundColor: '#000000ff'
    // marginBottom: hp(0.5),
  },
  settingDescription: {
    fontSize: RFValue(8),
    color: COLORS.textSecondary,
    lineHeight: RFValue(16),
    // backgroundColor: '#000000ff'
  },
  settingToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    // top: wp(2)
  },
  cardFooter: {
    paddingHorizontal: wp(6),
    paddingVertical: hp(4),
    // backgroundColor: COLORS.gameOverlayLight,
    // borderTopWidth: 1,
    borderTopColor: COLORS.borderSecondary,
  },
  footerText: {
    fontSize: RFValue(10),
    color: COLORS.textMuted,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});