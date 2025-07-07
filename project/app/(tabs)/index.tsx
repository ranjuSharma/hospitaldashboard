import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, FileText, Calendar, TrendingUp } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useHealthRecords } from '@/hooks/useHealthRecords';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/Card';

export default function DashboardScreen() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { uploadStats, loading, formatFileSize, getCategoryLabel } = useHealthRecords();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ padding: 24 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Header */}
          <View style={{ marginBottom: 32 }}>
            <ThemedText variant="heading" style={{ marginBottom: 8 }}>
              Welcome Back, {user?.name}
            </ThemedText>
            <ThemedText variant="body" color="textSecondary">
              Here's your health record summary
            </ThemedText>
          </View>

          {/* Profile Card */}
          <Card style={{ marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Calendar color={theme.colors.textSecondary} size={16} />
              <ThemedText variant="caption" color="textSecondary" style={{ marginLeft: 8 }}>
                Member since {formatDate(user?.createdAt || new Date())}
              </ThemedText>
            </View>
          </Card>

          {/* Stats Grid */}
          {uploadStats && (
            <View style={{ marginBottom: 24 }}>
              <ThemedText variant="subheading" style={{ marginBottom: 16 }}>
                Your Health Records
              </ThemedText>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                <Card style={{ flex: 1, marginRight: 8 }}>
                  <View style={{ alignItems: 'center' }}>
                    <FileText color={theme.colors.primary} size={24} />
                    <ThemedText variant="heading" style={{ marginTop: 8, marginBottom: 4 }}>
                      {uploadStats.totalFiles}
                    </ThemedText>
                    <ThemedText variant="caption" color="textSecondary">
                      Total Files
                    </ThemedText>
                  </View>
                </Card>
                <Card style={{ flex: 1, marginLeft: 8 }}>
                  <View style={{ alignItems: 'center' }}>
                    <TrendingUp color={theme.colors.secondary} size={24} />
                    <ThemedText variant="heading" style={{ marginTop: 8, marginBottom: 4 }}>
                      {formatFileSize(uploadStats.totalSize)}
                    </ThemedText>
                    <ThemedText variant="caption" color="textSecondary">
                      Total Size
                    </ThemedText>
                  </View>
                </Card>
              </View>
            </View>
          )}

          {/* Recent Uploads */}
          {uploadStats && uploadStats.recentUploads.length > 0 && (
            <View style={{ marginBottom: 24 }}>
              <ThemedText variant="subheading" style={{ marginBottom: 16 }}>
                Recent Uploads
              </ThemedText>
              {uploadStats.recentUploads.map((record) => (
                <Card key={record.id} style={{ marginBottom: 12 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 8,
                        backgroundColor: theme.colors.primary + '20',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                      }}
                    >
                      <FileText color={theme.colors.primary} size={20} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <ThemedText variant="body" style={{ marginBottom: 4 }}>
                        {record.fileName}
                      </ThemedText>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ThemedText variant="caption" color="textSecondary">
                          {getCategoryLabel(record.category)} • {formatFileSize(record.fileSize)}
                        </ThemedText>
                      </View>
                    </View>
                    <ThemedText variant="caption" color="textSecondary">
                      {formatDate(record.uploadDate)}
                    </ThemedText>
                  </View>
                </Card>
              ))}
            </View>
          )}

          {/* Categories */}
          {uploadStats && Object.keys(uploadStats.categories).length > 0 && (
            <View>
              <ThemedText variant="subheading" style={{ marginBottom: 16 }}>
                Categories
              </ThemedText>
              {Object.entries(uploadStats.categories).map(([category, count]) => (
                <Card key={category} style={{ marginBottom: 12 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <ThemedText variant="body">{getCategoryLabel(category)}</ThemedText>
                    <View
                      style={{
                        backgroundColor: theme.colors.primary + '20',
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        borderRadius: 12,
                      }}
                    >
                      <ThemedText variant="caption" color="primary">
                        {count} {count === 1 ? 'file' : 'files'}
                      </ThemedText>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          )}
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}