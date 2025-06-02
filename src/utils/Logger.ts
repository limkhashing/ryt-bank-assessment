/**
 * Logger utility for consistent logging throughout the application
 * Maybe could've use export class Logger { ... } if we need multiple configurations, such as Firebase, Sentry, etc
 */
export const Logger = {
  /**
   * Log debugging information (development only)
   */
  debug: (message: string, ...optionalParams: any[]) => {
    console.log(`[DEBUG] ${message}`, ...optionalParams);
  },

  /**
   * Log general information
   */
  info: (message: string, ...optionalParams: any[]) => {
    console.log(`[INFO] ${message}`, ...optionalParams);
  },

  /**
   * Log warnings that don't prevent the app from working
   */
  warn: (message: string, ...optionalParams: any[]) => {
    console.warn(`[WARN] ${message}`, ...optionalParams);
  },

  /**
   * Log errors that affect functionality
   */
  error: (message: string, error?: any, ...optionalParams: any[]) => {
    // Always log errors, even in production
    if (error instanceof Error) {
      console.error(`[ERROR] ${message}`, error.message, error.stack, ...optionalParams);
    } else {
      console.error(`[ERROR] ${message}`, error, ...optionalParams);
    }
  },
};
