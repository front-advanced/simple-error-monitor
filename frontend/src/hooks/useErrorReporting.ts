import { useCallback } from 'react';

export function useErrorReporting() {
  const reportError = useCallback((error: Error, severity?: 'low' | 'medium' | 'high' | 'critical') => {
    window.errorSDK.captureError(error, severity);
  }, []);

  return reportError;
}