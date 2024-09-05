import { serializeError } from './serializer';
import { SDKConfig, ErrorEvent } from './types';

export class ErrorHandler {
  private config: SDKConfig;

  constructor(config: SDKConfig) {
    this.config = config;
  }

  captureError(error: Error, severity?: ErrorEvent['severity']) {
    const serializedError = serializeError(error, severity);
    this.sendError(serializedError);
  }

  private sendError(errorEvent: ErrorEvent) {
    // For now, we'll just log the error instead of sending it to the server
    console.log('Captured error:', errorEvent);
    console.log('This would be sent to:', this.config.apiUrl);
  }

  setupGlobalHandlers() {
    window.onerror = (message, source, lineno, colno, error) => {
      if (error) {
        this.captureError(error, 'high');
      }
    };

    window.addEventListener('unhandledrejection', (event) => {
      if (event.reason instanceof Error) {
        this.captureError(event.reason, 'high');
      } else {
        this.captureError(new Error(String(event.reason)), 'high');
      }
    });
  }
}