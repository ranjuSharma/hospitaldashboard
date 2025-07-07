import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

export interface Theme {
  isDark: boolean;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
}

const lightTheme: Theme = {
  isDark: false,
  colors: {
    primary: '#0066CC',
    secondary: '#00A86B',
    accent: '#FF6B35',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    text: '#1A1A1A',
    textSecondary: '#666666',
    border: '#E0E0E0',
    success: '#00A86B',
    warning: '#FFA500',
    error: '#FF4444',
  },
};

const darkTheme: Theme = {
  isDark: true,
  colors: {
    primary: '#4A90E2',
    secondary: '#66BB6A',
    accent: '#FF8A65',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#B3B3B3',
    border: '#333333',
    success: '#66BB6A',
    warning: '#FFB74D',
    error: '#F44336',
  },
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isSystemDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isSystemDark, setIsSystemDark] = useState<boolean>(false);

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setIsSystemDark(colorScheme === 'dark');
    setIsDark(colorScheme === 'dark');

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsSystemDark(colorScheme === 'dark');
      setIsDark(colorScheme === 'dark');
    });

    return () => subscription?.remove();
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isSystemDark }}>
      {children}
    </ThemeContext.Provider>
  );
};