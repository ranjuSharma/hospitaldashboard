import React, { useState } from 'react';
import { View, ScrollView, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Upload, FileText, Camera, Plus } from 'lucide-react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useTheme } from '@/contexts/ThemeContext';
import { useHealthRecords } from '@/hooks/useHealthRecords';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

export default function UploadScreen() {
  const { theme } = useTheme();
  const { addRecord, formatFileSize } = useHealthRecords();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [category, setCategory] = useState<string>('other');
  const [uploading, setUploading] = useState(false);

  const categories = [
    { id: 'lab-results', label: 'Lab Results', icon: FileText },
    { id: 'prescriptions', label: 'Prescriptions', icon: FileText },
    { id: 'imaging', label: 'Imaging', icon: Camera },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'other', label: 'Other', icon: FileText },
  ];

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedFile(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      Alert.alert('Error', 'Please select a file to upload');
      return;
    }

    setUploading(true);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addRecord({
        fileName: selectedFile.name,
        fileType: selectedFile.mimeType || 'application/pdf',
        fileSize: selectedFile.size || 0,
        category: category as any,
        uri: selectedFile.uri,
      });

      Alert.alert('Success', 'File uploaded successfully!');
      setSelectedFile(null);
      setCategory('other');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 24 }}>
          {/* Header */}
          <View style={{ marginBottom: 32 }}>
            <ThemedText variant="heading" style={{ marginBottom: 8 }}>
              Upload Documents
            </ThemedText>
            <ThemedText variant="body" color="textSecondary">
              Add your health records securely
            </ThemedText>
          </View>

          {/* File Selection */}
          <Card style={{ marginBottom: 24 }}>
            <View style={{ alignItems: 'center', paddingVertical: 24 }}>
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
                <Upload color={theme.colors.primary} size={40} />
              </View>
              <ThemedText variant="subheading" style={{ marginBottom: 8 }}>
                Select File
              </ThemedText>
              <ThemedText variant="body" color="textSecondary" style={{ textAlign: 'center', marginBottom: 24 }}>
                Choose a PDF or image file to upload
              </ThemedText>
              <Button
                title="Choose File"
                onPress={pickDocument}
                icon={<Plus color="#FFFFFF" size={20} />}
              />
            </View>
          </Card>

          {/* Selected File */}
          {selectedFile && (
            <Card style={{ marginBottom: 24 }}>
              <ThemedText variant="subheading" style={{ marginBottom: 16 }}>
                Selected File
              </ThemedText>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    backgroundColor: theme.colors.secondary + '20',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}
                >
                  <FileText color={theme.colors.secondary} size={20} />
                </View>
                <View style={{ flex: 1 }}>
                  <ThemedText variant="body" style={{ marginBottom: 4 }}>
                    {selectedFile.name}
                  </ThemedText>
                  <ThemedText variant="caption" color="textSecondary">
                    {formatFileSize(selectedFile.size || 0)}
                  </ThemedText>
                </View>
              </View>
            </Card>
          )}

          {/* Category Selection */}
          <View style={{ marginBottom: 32 }}>
            <ThemedText variant="subheading" style={{ marginBottom: 16 }}>
              Select Category
            </ThemedText>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
              {categories.map((cat) => (
                <Card
                  key={cat.id}
                  pressable
                  onPress={() => setCategory(cat.id)}
                  style={{
                    backgroundColor: category === cat.id ? theme.colors.primary + '20' : theme.colors.surface,
                    borderColor: category === cat.id ? theme.colors.primary : theme.colors.border,
                    borderWidth: 1,
                    minWidth: 100,
                    alignItems: 'center',
                    paddingVertical: 16,
                  }}
                >
                  <cat.icon 
                    color={category === cat.id ? theme.colors.primary : theme.colors.textSecondary} 
                    size={24} 
                  />
                  <ThemedText
                    variant="caption"
                    color={category === cat.id ? 'primary' : 'textSecondary'}
                    style={{ marginTop: 8, textAlign: 'center' }}
                  >
                    {cat.label}
                  </ThemedText>
                </Card>
              ))}
            </View>
          </View>

          {/* Upload Button */}
          <Button
            title="Upload File"
            onPress={handleUpload}
            loading={uploading}
            disabled={!selectedFile}
            size="large"
            icon={<Upload color="#FFFFFF" size={20} />}
          />

          {/* Instructions */}
          <Card style={{ marginTop: 24, backgroundColor: theme.colors.primary + '10' }}>
            <ThemedText variant="subheading" style={{ marginBottom: 12 }}>
              Upload Guidelines
            </ThemedText>
            <ThemedText variant="body" style={{ marginBottom: 8 }}>
              • Supported formats: PDF, JPG, PNG
            </ThemedText>
            <ThemedText variant="body" style={{ marginBottom: 8 }}>
              • Maximum file size: 10MB
            </ThemedText>
            <ThemedText variant="body" style={{ marginBottom: 8 }}>
              • Ensure documents are clear and readable
            </ThemedText>
            <ThemedText variant="body">
              • Your files are encrypted and secure
            </ThemedText>
          </Card>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}