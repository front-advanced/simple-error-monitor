import { ErrorMonitoringSDK } from './src/sdk';

// Add the SDK instance to the window object for use throughout the application
declare global {
  interface Window {
    errorSDK: ErrorMonitoringSDK;
  }
}