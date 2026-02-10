
import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  Animated,
} from 'react-native';
import { COLORS, TYPOGRAPHY, BUTTON_STYLES, CARD_STYLES, SPACING, RADIUS, createTextShadow } from '../constants/theme';

// ============================================================================
// BUTTON COMPONENTS
// ============================================================================

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  children?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  title,
  children,
  style,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.primaryButton, style]}
      activeOpacity={0.8}
      {...props}
    >
      {title ? (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({
  title,
  children,
  style,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.secondaryButton, style]}
      activeOpacity={0.8}
      {...props}
    >
      {title ? (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export const AccentButton: React.FC<ButtonProps> = ({
  title,
  children,
  style,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.accentButton, style]}
      activeOpacity={0.8}
      {...props}
    >
      {title ? (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

// ============================================================================
// CARD COMPONENTS
// ============================================================================

interface CardProps {
  children: React.ReactNode;
  variant?: 'base' | 'bordered' | 'highlighted';
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'base',
  style,
}) => {
  const cardStyle = variant === 'bordered'
    ? styles.borderedCard
    : variant === 'highlighted'
    ? styles.highlightedCard
    : styles.baseCard;

  return <View style={[cardStyle, style]}>{children}</View>;
};

// ============================================================================
// TEXT COMPONENTS
// ============================================================================

interface ThemedTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  withShadow?: boolean;
}

export const ScreenTitle: React.FC<ThemedTextProps> = ({
  children,
  style,
  withShadow = true,
}) => {
  return (
    <Text style={[styles.screenTitle, withShadow && createTextShadow(), style]}>
      {children}
    </Text>
  );
};

export const SectionTitle: React.FC<ThemedTextProps> = ({
  children,
  style,
  withShadow = false,
}) => {
  return (
    <Text style={[styles.sectionTitle, withShadow && createTextShadow(), style]}>
      {children}
    </Text>
  );
};

export const BodyText: React.FC<ThemedTextProps> = ({
  children,
  style,
}) => {
  return <Text style={[styles.bodyText, style]}>{children}</Text>;
};

export const SmallText: React.FC<ThemedTextProps> = ({
  children,
  style,
}) => {
  return <Text style={[styles.smallText, style]}>{children}</Text>;
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  // Buttons
  primaryButton: {
    ...BUTTON_STYLES.primary,
  },
  secondaryButton: {
    ...BUTTON_STYLES.secondary,
  },
  accentButton: {
    ...BUTTON_STYLES.accent,
  },
  buttonText: {
    ...TYPOGRAPHY.button,
  },

  // Cards
  baseCard: {
    ...CARD_STYLES.base,
  },
  borderedCard: {
    ...CARD_STYLES.bordered,
  },
  highlightedCard: {
    ...CARD_STYLES.highlighted,
  },

  // Text
  screenTitle: {
    ...TYPOGRAPHY.screenTitle,
  },
  sectionTitle: {
    ...TYPOGRAPHY.sectionTitle,
  },
  bodyText: {
    ...TYPOGRAPHY.body,
  },
  smallText: {
    ...TYPOGRAPHY.small,
  },
});
