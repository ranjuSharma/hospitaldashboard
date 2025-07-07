import React, { useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemedText } from './ThemedText';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{ marginBottom: 16 }}>
      {label && (
        <ThemedText variant="label" style={{ marginBottom: 8 }}>
          {label}
        </ThemedText>
      )}
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: error ? theme.colors.error : isFocused ? theme.colors.primary : theme.colors.border,
            borderRadius: 8,
            backgroundColor: theme.colors.surface,
            paddingHorizontal: 16,
            paddingVertical: 12,
          },
        ]}
      >
        {leftIcon && (
          <View style={{ marginRight: 12 }}>
            {leftIcon}
          </View>
        )}
        <TextInput
          style={[
            {
              flex: 1,
              fontSize: 16,
              color: theme.colors.text,
              fontWeight: '400',
            },
            style,
          ]}
          placeholderTextColor={theme.colors.textSecondary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {rightIcon && (
          <View style={{ marginLeft: 12 }}>
            {rightIcon}
          </View>
        )}
      </View>
      {error && (
        <ThemedText variant="caption" color="error" style={{ marginTop: 4 }}>
          {error}
        </ThemedText>
      )}
      {helperText && !error && (
        <ThemedText variant="caption" color="textSecondary" style={{ marginTop: 4 }}>
          {helperText}
        </ThemedText>
      )}
    </View>
  );
};