/**
 * API and service-related type definitions
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
