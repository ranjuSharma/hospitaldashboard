import React, { useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, Filter, Search } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useHealthRecords } from '@/hooks/useHealthRecords';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';

export default function RecordsScreen() {
  const { theme } = useTheme();
  const { records, loading, formatFileSize, getCategoryLabel } = useHealthRecords();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const filteredRecords = records.filter(record =>
    record.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getCategoryLabel(record.category).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'lab-results': theme.colors.primary,
      'prescriptions': theme.colors.secondary,
      'imaging': theme.colors.accent,
      'reports': theme.colors.warning,
      'other': theme.colors.textSecondary,
    };
    return colors[category] || theme.colors.textSecondary;
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
          <View style={{ marginBottom: 24 }}>
            <ThemedText variant="heading" style={{ marginBottom: 8 }}>
              Health Records
            </ThemedText>
            <ThemedText variant="body" color="textSecondary">
              View and manage your uploaded documents
            </ThemedText>
          </View>

          {/* Search */}
          <View style={{ marginBottom: 24 }}>
            <Input
              placeholder="Search records..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              leftIcon={<Search color={theme.colors.textSecondary} size={20} />}
            />
          </View>

          {/* Records List */}
          {filteredRecords.length === 0 ? (
            <Card style={{ alignItems: 'center', paddingVertical: 48 }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: theme.colors.primary + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <FileText color={theme.colors.primary} size={40} />
              </View>
              <ThemedText variant="subheading" style={{ marginBottom: 8 }}>
                No Records Found
              </ThemedText>
              <ThemedText variant="body" color="textSecondary" style={{ textAlign: 'center' }}>
                {searchQuery ? 'No records match your search' : 'Upload your first health record to get started'}
              </ThemedText>
            </Card>
          ) : (
            <View>
              <ThemedText variant="subheading" style={{ marginBottom: 16 }}>
                {filteredRecords.length} {filteredRecords.length === 1 ? 'Record' : 'Records'}
              </ThemedText>
              {filteredRecords.map((record) => (
                <Card key={record.id} style={{ marginBottom: 16 }} pressable>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 8,
                        backgroundColor: getCategoryColor(record.category) + '20',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 16,
                      }}
                    >
                      <FileText color={getCategoryColor(record.category)} size={20} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <ThemedText variant="body" style={{ marginBottom: 4 }}>
                        {record.fileName}
                      </ThemedText>
                      <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                        <View
                          style={{
                            backgroundColor: getCategoryColor(record.category) + '20',
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            borderRadius: 8,
                            marginRight: 8,
                            marginBottom: 4,
                          }}
                        >
                          <ThemedText variant="caption" style={{ color: getCategoryColor(record.category) }}>
                            {getCategoryLabel(record.category)}
                          </ThemedText>
                        </View>
                        <ThemedText variant="caption" color="textSecondary">
                          {formatFileSize(record.fileSize)}
                        </ThemedText>
                      </View>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <ThemedText variant="caption" color="textSecondary">
                        {formatDate(record.uploadDate)}
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