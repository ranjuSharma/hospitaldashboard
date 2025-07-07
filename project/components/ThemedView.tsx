import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemedViewProps extends ViewProps {
  surface?: boolean;
}

export const ThemedView: React.FC<ThemedViewProps> = ({ style, surface, ...props }) => {
  const { theme } = useTheme();
  
  return (
    <View
      style={[
        {
          backgroundColor: surface ? theme.colors.surface : theme.colors.background,
        },
        style,
      ]}
      {...props}
    />
  );
};