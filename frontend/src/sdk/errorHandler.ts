import { serializeError } from './serializer';
import { SDKConfig, ErrorEvent } from './types';

export class ErrorHandler {
  private config: SDKConfig;
  private queue: ErrorEvent[] = [];
  private isSending: boolean = false;
  private maxRetries: number = 3;
  private retryInterval: number = 1000;

  constructor(config: SDKConfig) {
    this.config = config;
  }

  captureError(error: Error, severity?: ErrorEvent['severity']) {
    const serializedError = serializeError(error, severity);
    this.queue.push(serializedError);
    this.sendErrors();
  }

  private async sendErrors() {
    if (this.queue.length === 0 || this.isSending) {
      return;
    }

    this.isSending = true;

    while (this.queue.length > 0) {
      const error = this.queue[0];
      let retryCount = 0;
      let success = false;

      while (retryCount < this.maxRetries && !success) {
        try {
          const response = await fetch(this.config.apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...error,
              projectId: this.config.projectId,
              environment: this.config.environment,
              version: import.meta.env.VITE_GIT_COMMIT_HASH,
            }),
          });

          if (response.ok) {
            success = true;
            this.queue.shift(); // Remove the successfully sent error
          } else {
            throw new Error('Failed to send error');
          }
        } catch (err) {
          console.error(`Failed to send error (attempt ${retryCount + 1}/${this.maxRetries}):`, err);
          retryCount++;

          if (retryCount < this.maxRetries) {
            await new Promise(resolve => setTimeout(resolve, this.retryInterval * retryCount)); // Exponential backoff
          }
        }
      }

      if (!success) {
        console.error('Max retries reached for error. Skipping.');
        this.queue.shift(); // Remove the error after max retries
      }
    }

    this.isSending = false;
  }

  setupGlobalHandlers() {
    window.onerror = (_message, _source, _lineno, _colno, error) => {
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