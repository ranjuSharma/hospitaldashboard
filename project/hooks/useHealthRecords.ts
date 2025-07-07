import { useState, useEffect } from 'react';
import { HealthRecord, UploadStats } from '@/types/HealthRecord';

const mockHealthRecords: HealthRecord[] = [
  {
    id: '1',
    fileName: 'Blood Test Results - Jan 2024.pdf',
    fileType: 'application/pdf',
    fileSize: 245000,
    uploadDate: new Date('2024-01-15'),
    category: 'lab-results',
    uri: 'https://example.com/blood-test.pdf',
  },
  {
    id: '2',
    fileName: 'Prescription - Medication List.pdf',
    fileType: 'application/pdf',
    fileSize: 180000,
    uploadDate: new Date('2024-01-10'),
    category: 'prescriptions',
    uri: 'https://example.com/prescription.pdf',
  },
  {
    id: '3',
    fileName: 'X-Ray Chest.pdf',
    fileType: 'application/pdf',
    fileSize: 1200000,
    uploadDate: new Date('2024-01-05'),
    category: 'imaging',
    uri: 'https://example.com/xray.pdf',
  },
];

export const useHealthRecords = () => {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadStats, setUploadStats] = useState<UploadStats | null>(null);

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setRecords(mockHealthRecords);
      
      // Calculate stats
      const stats: UploadStats = {
        totalFiles: mockHealthRecords.length,
        totalSize: mockHealthRecords.reduce((sum, record) => sum + record.fileSize, 0),
        categories: mockHealthRecords.reduce((acc, record) => {
          acc[record.category] = (acc[record.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        recentUploads: mockHealthRecords.slice(0, 3),
      };
      
      setUploadStats(stats);
      setLoading(false);
    }, 1000);
  }, []);

  const addRecord = (record: Omit<HealthRecord, 'id' | 'uploadDate'>) => {
    const newRecord: HealthRecord = {
      ...record,
      id: Date.now().toString(),
      uploadDate: new Date(),
    };
    
    setRecords(prev => [newRecord, ...prev]);
    
    // Update stats
    if (uploadStats) {
      setUploadStats(prev => ({
        ...prev!,
        totalFiles: prev!.totalFiles + 1,
        totalSize: prev!.totalSize + record.fileSize,
        categories: {
          ...prev!.categories,
          [record.category]: (prev!.categories[record.category] || 0) + 1,
        },
        recentUploads: [newRecord, ...prev!.recentUploads.slice(0, 2)],
      }));
    }
  };

  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCategoryLabel = (category: string): string => {
    const labels: Record<string, string> = {
      'lab-results': 'Lab Results',
      'prescriptions': 'Prescriptions',
      'imaging': 'Imaging',
      'reports': 'Reports',
      'other': 'Other',
    };
    return labels[category] || category;
  };

  return {
    records,
    loading,
    uploadStats,
    addRecord,
    deleteRecord,
    formatFileSize,
    getCategoryLabel,
  };
};