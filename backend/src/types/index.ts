export interface DepartmentSales {
  departmentName: string;
  date: string;
  sales: number;
}

export interface DepartmentTotal {
  departmentName: string;
  totalSales: number;
}

export interface ProcessingResult {
  success: boolean;
  message?: string;
  downloadUrl?: string;
  processingTime?: number;
  departmentsCount?: number;
  error?: string;
}

export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
}
