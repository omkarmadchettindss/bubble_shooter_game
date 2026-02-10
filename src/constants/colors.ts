/**
 * @deprecated Use theme.ts instead for the new design system
 * This file is kept for backward compatibility during migration
 */

import { COLORS as THEME_COLORS } from './theme';

export const COLORS = {
  // Primary Colors
  primary: THEME_COLORS.primary,
  primaryLight: THEME_COLORS.primaryLight,
  primaryDark: THEME_COLORS.primaryDark,
  
  // Secondary Colors (for destructive actions)
  secondary: '#dc3545',
  secondaryLight: 'rgba(220, 53, 69, 0.2)',
  secondaryDark: '#c82333',
  
  // Background Colors
  backgroundDark: THEME_COLORS.backgroundDark,
  backgroundOverlay: THEME_COLORS.overlayGradient,
  cardBackground: THEME_COLORS.cardBackground,
  cardBackgroundLight: THEME_COLORS.cardBackgroundLight,
  
  // Text Colors
  textPrimary: THEME_COLORS.textPrimary,
  textSecondary: THEME_COLORS.textSecondary,
  textMuted: THEME_COLORS.textMuted,
  textDisabled: THEME_COLORS.textDisabled,
  
  // Border Colors
  borderPrimary: THEME_COLORS.borderPrimary,
  borderSecondary: THEME_COLORS.borderSecondary,
  borderLight: THEME_COLORS.borderLight,
  borderDark: THEME_COLORS.borderDark,
  
  // Status Colors
  success: THEME_COLORS.success,
  warning: THEME_COLORS.warning,
  error: THEME_COLORS.error,
  info: THEME_COLORS.info,
  
  // Transparent Colors
  transparent: THEME_COLORS.transparent,
  black: THEME_COLORS.black,
  white: THEME_COLORS.white,
  
  // Game Specific Colors
  gameAccent: THEME_COLORS.primary,
  gameAccentLight: 'rgba(255, 153, 0, 0.44)',
  gameAccentMedium: 'rgba(255, 152, 0, 0.25)',
  gameOverlay: 'rgba(0, 0, 0, 0.4)',
  gameOverlayLight: THEME_COLORS.overlayTop,
  gameOverlayDark: THEME_COLORS.overlayBottom,
  
  // Shadow Colors
  shadowPrimary: THEME_COLORS.black,
  shadowSecondary: THEME_COLORS.primary,
};