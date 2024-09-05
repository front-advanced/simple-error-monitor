export interface ErrorEvent {
  message: string;
  stack: string;
  timestamp: string;
  url: string;
  userAgent: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  metadata: Record<string, any>;
}

export interface SDKConfig {
  projectId: string;
  environment: 'production' | 'development' | 'staging';
  apiUrl: string;
}