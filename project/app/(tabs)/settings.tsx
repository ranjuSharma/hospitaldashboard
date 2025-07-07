import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Moon, Sun, Shield, LogOut, Bell, CircleHelp as HelpCircle } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: logout },
      ]
    );
  };

  const settings = [
    {
      id: 'theme',
      title: 'Dark Mode',
      subtitle: 'Toggle between light and dark themes',
      icon: theme.isDark ? Sun : Moon,
      action: toggleTheme,
      type: 'toggle',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Manage your notification preferences',
      icon: Bell,
      action: () => Alert.alert('Coming Soon', 'This feature will be available soon'),
      type: 'navigate',
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      subtitle: 'Manage your privacy settings',
      icon: Shield,
      action: () => Alert.alert('Coming Soon', 'This feature will be available soon'),
      type: 'navigate',
    },
    {
      id: 'help',
      title: 'Help & Support',
      subtitle: 'Get help or contact support',
      icon: HelpCircle,
      action: () => Alert.alert('Coming Soon', 'This feature will be available soon'),
      type: 'navigate',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 24 }}>
          {/* Header */}
          <View style={{ marginBottom: 32 }}>
            <ThemedText variant="heading" style={{ marginBottom: 8 }}>
              Settings
            </ThemedText>
            <ThemedText variant="body" color="textSecondary">
              Manage your account and preferences
            </ThemedText>
          </View>

          {/* Profile Card */}
          <Card style={{ marginBottom: 32 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: theme.colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}
              >
                <User color="#FFFFFF" size={30} />
              </View>
              <View style={{ flex: 1 }}>
                <ThemedText variant="subheading" style={{ marginBottom: 4 }}>
                  {user?.name}
                </ThemedText>
                <ThemedText variant="body" color="textSecondary">
                  {user?.email}
                </ThemedText>
              </View>
            </View>
          </Card>

          {/* Settings List */}
          <View style={{ marginBottom: 32 }}>
            {settings.map((setting) => (
              <Card
                key={setting.id}
                style={{ marginBottom: 16 }}
                pressable
                onPress={setting.action}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      backgroundColor: theme.colors.primary + '20',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 16,
                    }}
                  >
                    <setting.icon color={theme.colors.primary} size={20} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <ThemedText variant="body" style={{ marginBottom: 4 }}>
                      {setting.title}
                    </ThemedText>
                    <ThemedText variant="caption" color="textSecondary">
                      {setting.subtitle}
                    </ThemedText>
                  </View>
                </View>
              </Card>
            ))}
          </View>

          {/* Logout Button */}
          <Button
            title="Sign Out"
            variant="outline"
            onPress={handleLogout}
            size="large"
            icon={<LogOut color={theme.colors.error} size={20} />}
            style={{ 
              borderColor: theme.colors.error,
              backgroundColor: theme.colors.error + '10',
            }}
          />

          {/* App Version */}
          <View style={{ alignItems: 'center', marginTop: 24 }}>
            <ThemedText variant="caption" color="textSecondary">
              Health Records App v1.0.0
            </ThemedText>
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}