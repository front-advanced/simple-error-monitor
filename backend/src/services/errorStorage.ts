import { v4 as uuidv4 } from 'uuid';

interface ErrorEvent {
  id: string;
  message: string;
  stack: string;
  timestamp: Date;
  url: string;
  userAgent: string;
  projectId: string;
  environment: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  metadata: {
    [key: string]: any;
  };
}

class ErrorStorageService {
  private errors: ErrorEvent[] = [];

  storeError(errorData: Omit<ErrorEvent, 'id'>): string {
    const id = uuidv4();
    const error: ErrorEvent = { ...errorData, id };
    this.errors.push(error);
    return id;
  }

  getError(id: string): ErrorEvent | undefined {
    return this.errors.find(error => error.id === id);
  }

  // Additional methods can be added here, such as retrieving error lists or updating error statuses
}

export const errorStorage = new ErrorStorageService();