export interface HealthRecord {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadDate: Date;
  category: 'lab-results' | 'prescriptions' | 'imaging' | 'reports' | 'other';
  uri: string;
  preview?: string;
}

export interface UploadStats {
  totalFiles: number;
  totalSize: number;
  categories: Record<string, number>;
  recentUploads: HealthRecord[];
}