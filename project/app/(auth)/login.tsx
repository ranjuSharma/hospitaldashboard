import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, Heart } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login, isLoading } = useAuth();
  const { theme } = useTheme();

  const validateForm = () => {
    let isValid = true;
    
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const success = await login(email, password);
      if (!success) {
        Alert.alert('Login Failed', 'Please check your credentials and try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
              {/* Header */}
              <View style={{ alignItems: 'center', marginBottom: 48 }}>
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: theme.colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}
                >
                  <Heart color="#FFFFFF" size={40} />
                </View>
                <ThemedText variant="heading" style={{ textAlign: 'center', marginBottom: 8 }}>
                  Welcome Back
                </ThemedText>
                <ThemedText variant="body" color="textSecondary" style={{ textAlign: 'center' }}>
                  Sign in to access your health records
                </ThemedText>
              </View>

              {/* Form */}
              <View style={{ marginBottom: 32 }}>
                <Input
                  label="Email Address"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={emailError}
                  leftIcon={<Mail color={theme.colors.textSecondary} size={20} />}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  error={passwordError}
                  leftIcon={<Lock color={theme.colors.textSecondary} size={20} />}
                />
              </View>

              {/* Login Button */}
              <Button
                title="Sign In"
                onPress={handleLogin}
                loading={isLoading}
                size="large"
                style={{ marginBottom: 24 }}
              />

              {/* Register Link */}
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <ThemedText variant="body" color="textSecondary">
                  Don't have an account? <Link href="/(auth)/register" asChild>
                    <ThemedText variant="body" color="primary" style={{ fontWeight: '600' }}>
                      Sign Up
                    </ThemedText>
                  </Link>
                </ThemedText>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ThemedView>
    </SafeAreaView>
  );
}