import React, { forwardRef } from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemedTextProps extends TextProps {
  variant?: 'heading' | 'subheading' | 'body' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'text' | 'textSecondary' | 'success' | 'warning' | 'error';
}

export const ThemedText = forwardRef<Text, ThemedTextProps>(({ 
  style, 
  variant = 'body', 
  color = 'text',
  ...props 
}, ref) => {
  const { theme } = useTheme();
  
  const getFontSize = () => {
    switch (variant) {
      case 'heading': return 28;
      case 'subheading': return 20;
      case 'body': return 16;
      case 'caption': return 14;
      case 'label': return 12;
      default: return 16;
    }
  };

  const getFontWeight = () => {
    switch (variant) {
      case 'heading': return '700';
      case 'subheading': return '600';
      case 'label': return '600';
      default: return '400';
    }
  };

  const getColor = () => {
    switch (color) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'text': return theme.colors.text;
      case 'textSecondary': return theme.colors.textSecondary;
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      case 'error': return theme.colors.error;
      default: return theme.colors.text;
    }
  };
  
  return (
    <Text
      ref={ref}
      style={[
        {
          fontSize: getFontSize(),
          fontWeight: getFontWeight(),
          color: getColor(),
          lineHeight: getFontSize() * 1.5,
        },
        style,
      ]}
      {...props}
    />
  );
});

ThemedText.displayName = 'ThemedText';