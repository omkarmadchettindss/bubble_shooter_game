export const COLORS = {
  // Primary - Orange/Gold for main actions and highlights
  primary: '#ff9800',
  primaryLight: 'rgba(255, 152, 0, 0.8)',
  primaryDark: '#e68900',
  primaryGlow: 'rgba(255, 152, 0, 0.3)',
  
  // Accent - Purple for special modes (tournaments, rare rewards)
  accent: '#7C3AED',
  accentLight: 'rgba(124, 58, 237, 0.8)',
  accentDark: '#6D28D9',
  
  // Backgrounds
  backgroundDark: '#0b0b0b',        // Main dark background
  cardBackground: '#1a1a1a',        // Card backgrounds
  cardBackgroundLight: '#2a2a2a',   // Lighter card variant
  
  // Overlays - for backgrounds, NOT for icons/rewards
  overlayTop: 'rgba(0, 0, 0, 0.3)',
  overlayBottom: 'rgba(0, 0, 0, 0.6)',
  overlayGradient: 'rgba(11, 11, 11, 0.7)',
  
  // Text
  textPrimary: '#ffffff',
  textSecondary: '#947946ff',
  textMuted: '#888888',
  textDisabled: 'rgba(255, 255, 255, 0.5)',
  
  // Borders
  borderPrimary: 'rgba(255, 152, 0, 0.3)',
  borderSecondary: 'rgba(255, 152, 0, 0.2)',
  borderLight: 'rgba(255, 255, 255, 0.1)',
  borderDark: 'rgba(0, 0, 0, 0.3)',
  
  // Status
  success: '#28a745',
  warning: '#ffc107',
  error: '#dc3545',
  info: '#17a2b8',
  
  // Utility
  transparent: 'transparent',
  black: '#000000',
  white: '#ffffff',
  
  // Gold theme for coins/rewards (matches existing assets)
  gold: '#FFD700',
  goldDark: '#866a1eff',
};

// ============================================================================
// TYPOGRAPHY SYSTEM
// ============================================================================

export const TYPOGRAPHY = {
  // Screen titles (largest, bold)
  screenTitle: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  
  // Section titles (medium, semibold)
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: COLORS.textPrimary,
    letterSpacing: 0.3,
  },
  
  // Body text (normal)
  body: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  
  // Small text
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    color: COLORS.textMuted,
  },
  
  // Button text
  button: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: COLORS.white,
  },
  
  // Caption
  caption: {
    fontSize: 10,
    fontWeight: '400' as const,
    color: COLORS.textMuted,
  },
};

// ============================================================================
// SPACING SYSTEM (8-point grid)
// ============================================================================

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 999,
};

// ============================================================================
// SHADOWS
// ============================================================================

export const SHADOWS = {
  small: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
  },
  glow: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
};

// ============================================================================
// BUTTON STYLES
// ============================================================================

export const BUTTON_STYLES = {
  // Primary button - Orange gradient for main actions
  primary: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    ...SHADOWS.glow,
  },
  
  // Secondary button - Dark with subtle border
  secondary: {
    backgroundColor: COLORS.cardBackground,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  
  // Accent button - Purple for special actions
  accent: {
    backgroundColor: COLORS.accent,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    ...SHADOWS.medium,
  },
};

// ============================================================================
// CARD STYLES
// ============================================================================

export const CARD_STYLES = {
  // Base card style
  base: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  
  // Card with border
  bordered: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  
  // Highlighted card
  highlighted: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderPrimary,
    ...SHADOWS.medium,
  },
};

// ============================================================================
// ANIMATION CONFIGS
// ============================================================================

export const ANIMATIONS = {
  // Button press
  buttonPress: {
    scale: 0.95,
    duration: 100,
  },
  
  // Fade in
  fadeIn: {
    duration: 300,
  },
  
  // Slide in
  slideIn: {
    duration: 250,
  },
  
  // Bounce
  bounce: {
    tension: 40,
    friction: 3,
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Creates a linear gradient overlay for backgrounds
 * Use this ONLY for background images, NOT for icons or rewards
 */
export const createBackgroundOverlay = () => ({
  backgroundColor: COLORS.overlayGradient,
});

/**
 * Creates a subtle glow effect for primary elements
 */
export const createGlowEffect = (color: string = COLORS.primary) => ({
  shadowColor: color,
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.5,
  shadowRadius: 10,
  elevation: 5,
});

/**
 * Creates consistent text shadow for readability over images
 */
export const createTextShadow = () => ({
  textShadowColor: 'rgba(0, 0, 0, 0.3)',
  textShadowOffset: { width: 0, height: 2 },
  textShadowRadius: 4,
});

export default {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  SHADOWS,
  BUTTON_STYLES,
  CARD_STYLES,
  ANIMATIONS,
  createBackgroundOverlay,
  createGlowEffect,
  createTextShadow,
};
