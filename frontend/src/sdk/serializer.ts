import { ErrorEvent } from './types';

export function serializeError(error: Error, severity: ErrorEvent['severity'] = 'medium'): ErrorEvent {
  return {
    message: error.message,
    stack: error.stack || '',
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    severity,
    metadata: {},
  };
}