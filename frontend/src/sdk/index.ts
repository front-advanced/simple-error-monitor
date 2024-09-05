import { ErrorHandler } from './errorHandler';
import { SDKConfig } from './types';

export class ErrorMonitoringSDK {
  private errorHandler: ErrorHandler;

  constructor(config: SDKConfig) {
    this.errorHandler = new ErrorHandler(config);
  }

  init() {
    this.errorHandler.setupGlobalHandlers();
  }

  captureError(error: Error, severity?: 'low' | 'medium' | 'high' | 'critical') {
    this.errorHandler.captureError(error, severity);
  }
}

export type { SDKConfig };