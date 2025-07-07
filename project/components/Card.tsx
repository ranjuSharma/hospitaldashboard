import React from 'react';
import { View, ViewProps, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface CardProps extends ViewProps {
  pressable?: boolean;
  onPress?: TouchableOpacityProps['onPress'];
  elevation?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  pressable = false,
  onPress,
  elevation = 1,
  ...props
}) => {
  const { theme } = useTheme();

  const cardStyle = {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    shadowColor: theme.colors.text,
    shadowOffset: {
      width: 0,
      height: elevation,
    },
    shadowOpacity: theme.isDark ? 0.1 : 0.05,
    shadowRadius: elevation * 2,
    elevation: elevation,
    borderWidth: theme.isDark ? 1 : 0,
    borderColor: theme.colors.border,
  };

  if (pressable) {
    return (
      <TouchableOpacity
        style={[cardStyle, style]}
        onPress={onPress}
        activeOpacity={0.7}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[cardStyle, style]} {...props}>
      {children}
    </View>
  );
};