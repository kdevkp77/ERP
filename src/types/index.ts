
export type UserRole = 'admin' | 'supervisor' | 'auditor' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  isActive: boolean;
  countriesCovered: string[];
  geoValidationRequired: boolean;
  allowMultipleDatasets: boolean;
  colorScheme: {
    headerBand: string;
    buttonForeground: string;
    buttonBackground: string;
    background: string;
    text: string;
  };
  databaseName: string;
  watermark: string;
  contractPeriods: ContractPeriod[];
  autoMailOnNonCompliance: boolean;
  sosCalculationWithAssumption: boolean;
  reportConfig: ClientReportConfig;
}

export interface ClientReportConfig {
  reports: ReportDefinition[];
  defaultLandingReportId?: string;
  photoGallery: {
    enabled: boolean;
    allowDownload: boolean;
    allowZoom: boolean;
  };
}

export interface ReportDefinition {
  id: string;
  name: string;
  fileName: string;
  country: string;
  category?: string;
}

export interface ContractPeriod {
  country: string;
  startDate: string;
  endDate: string;
  frequency: string;
  cycles: Cycle[];
}

export interface Cycle {
  id: string; // Unique ID
  cycleNo: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'closed' | 'upcoming';
  virtualChannels: VirtualChannel[];
}

export interface VirtualChannel {
  id: string;
  name: string; // e.g., 'A', 'B'
  requiredVisits: number;
  activatedVisitCount: number; // 0, 1, 2...
  status: 'active' | 'inactive';
}

export interface Store {
  id: string;
  name: string;
  address: string;
  channel: string; // e.g., 'Hypermarket'
  virtualChannelId: string; // Link to VC
  requiredVisits: number; // Max visits per cycle
  city: string;
  state: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Template {
  id: string;
  name: string;
  fields: FormField[];
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'photo' | 'boolean' | 'date';
  required: boolean;
  options?: string[];
  // New Logic
  inputType?: string; // e.g., "combo;input"
  dataType?: string; // e.g., "integer(3)"
  condition?: string; // e.g., "!null:(osaprice)"
  range?: string; // e.g., "1-100"
}

export interface Visit {
  id: string;
  storeId: string;
  auditorId: string;
  date: string;
  status: 'planned' | 'in-progress' | 'completed' | 'validated' | 'rejected';
  templateId: string;
  cycleId: string;
  visitNumber: number; // 1, 2, 3...
}

export interface AuditRecord {
  id: string;
  visitId: string;
  data: Record<string, any>;
  photos: string[];
  submittedAt: string;
}
